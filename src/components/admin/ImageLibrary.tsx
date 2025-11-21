import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './ImageLibrary.css';

interface ImageItem {
  id: string;
  url: string;
  name: string;
  uploadedAt: any;
  uploadedBy: string;
}

interface SlideshowImage {
  id: string;
  url: string;
  name: string;
  createdAt: any;
}

interface Headshot {
  url: string;
  name?: string;
  updatedAt?: any;
}

const ImageLibrary = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageName, setNewImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [slideshowImages, setSlideshowImages] = useState<SlideshowImage[]>([]);
  const [loadingSlides, setLoadingSlides] = useState(true);
  const [newSlideUrl, setNewSlideUrl] = useState('');
  const [newSlideName, setNewSlideName] = useState('');
  const [uploadingSlide, setUploadingSlide] = useState(false);

  // Home page slideshow images
  const [homeSlides, setHomeSlides] = useState<SlideshowImage[]>([]);
  const [loadingHomeSlides, setLoadingHomeSlides] = useState(true);
  const [newHomeSlideUrl, setNewHomeSlideUrl] = useState('');
  const [newHomeSlideName, setNewHomeSlideName] = useState('');
  const [uploadingHomeSlide, setUploadingHomeSlide] = useState(false);

  const [headshot, setHeadshot] = useState<Headshot | null>(null);
  const [headshotUrl, setHeadshotUrl] = useState('');
  const [headshotName, setHeadshotName] = useState('');
  const [loadingHeadshot, setLoadingHeadshot] = useState(true);
  const [savingHeadshot, setSavingHeadshot] = useState(false);

  useEffect(() => {
    fetchImages();
    fetchSlideshowImages();
    fetchHomeSlideshowImages();
    fetchHeadshot();
  }, []);

  const fetchImages = async () => {
    try {
      const imagesRef = collection(db, 'images');
      const querySnapshot = await getDocs(imagesRef);
      
      const imagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ImageItem[];
      
      setImages(imagesData.sort((a, b) => 
        b.uploadedAt?.toMillis() - a.uploadedAt?.toMillis()
      ));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSlideshowImages = async () => {
    try {
      const slidesRef = collection(db, 'slideshowImages');
      const slidesQuery = query(slidesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(slidesQuery);

      const slidesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SlideshowImage[];

      setSlideshowImages(slidesData);
    } catch (error) {
      console.error('Error fetching slideshow images:', error);
    } finally {
      setLoadingSlides(false);
    }
  };

  const fetchHomeSlideshowImages = async () => {
    setLoadingHomeSlides(true);
    try {
      const slidesRef = collection(db, 'homeSlideshowImages');
      const slidesQuery = query(slidesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(slidesQuery);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any),
      })) as SlideshowImage[];
      setHomeSlides(items);
    } catch (error) {
      console.error('Error fetching home slideshow images:', error);
    } finally {
      setLoadingHomeSlides(false);
    }
  };

  const fetchHeadshot = async () => {
    try {
      const headshotDoc = await getDocs(collection(db, 'headshots'));
      // Use the first doc if any exist
      if (!headshotDoc.empty) {
        const docSnap = headshotDoc.docs[0];
        const data = docSnap.data() as Headshot;
        setHeadshot(data);
        setHeadshotUrl(data.url || '');
        setHeadshotName(data.name || '');
      } else {
        setHeadshot(null);
        setHeadshotUrl('');
        setHeadshotName('');
      }
    } catch (error) {
      console.error('Error fetching headshot:', error);
    } finally {
      setLoadingHeadshot(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newImageUrl.trim() || !newImageName.trim()) {
      alert('Please provide both image URL and name');
      return;
    }

    setUploading(true);
    try {
      const docRef = await addDoc(collection(db, 'images'), {
        url: newImageUrl.trim(),
        name: newImageName.trim(),
        uploadedAt: serverTimestamp(),
        uploadedBy: 'admin'
      });

      setImages([{
        id: docRef.id,
        url: newImageUrl.trim(),
        name: newImageName.trim(),
        uploadedAt: new Date(),
        uploadedBy: 'admin'
      }, ...images]);

      setNewImageUrl('');
      setNewImageName('');
      alert('Image added successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSlideUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newSlideUrl.trim() || !newSlideName.trim()) {
      alert('Please provide both slideshow image URL and name');
      return;
    }

    setUploadingSlide(true);
    try {
      const docRef = await addDoc(collection(db, 'slideshowImages'), {
        url: newSlideUrl.trim(),
        name: newSlideName.trim(),
        createdAt: serverTimestamp()
      });

      setSlideshowImages([
        {
          id: docRef.id,
          url: newSlideUrl.trim(),
          name: newSlideName.trim(),
          createdAt: new Date()
        },
        ...slideshowImages
      ]);

      setNewSlideUrl('');
      setNewSlideName('');
      alert('Slideshow image added successfully!');
    } catch (error) {
      console.error('Error uploading slideshow image:', error);
      alert('Failed to upload slideshow image');
    } finally {
      setUploadingSlide(false);
    }
  };

  const handleHomeSlideUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newHomeSlideUrl.trim() || !newHomeSlideName.trim()) {
      alert('Please provide both a name and URL for the home slideshow image.');
      return;
    }

    setUploadingHomeSlide(true);
    try {
      const docRef = await addDoc(collection(db, 'homeSlideshowImages'), {
        url: newHomeSlideUrl.trim(),
        name: newHomeSlideName.trim(),
        createdAt: serverTimestamp(),
      });

      setHomeSlides([
        {
          id: docRef.id,
          url: newHomeSlideUrl.trim(),
          name: newHomeSlideName.trim(),
          createdAt: new Date(),
        },
        ...homeSlides,
      ]);

      setNewHomeSlideUrl('');
      setNewHomeSlideName('');
    } catch (error) {
      console.error('Error uploading home slideshow image:', error);
      alert('Failed to upload home slideshow image');
    } finally {
      setUploadingHomeSlide(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'images', id));
      setImages(images.filter(img => img.id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleDeleteSlide = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this image from the slideshow?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'slideshowImages', id));
      setSlideshowImages(slideshowImages.filter(img => img.id !== id));
    } catch (error) {
      console.error('Error deleting slideshow image:', error);
      alert('Failed to delete slideshow image');
    }
  };

  const handleDeleteHomeSlide = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this image from the home page slideshow?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'homeSlideshowImages', id));
      setHomeSlides(homeSlides.filter(img => img.id !== id));
    } catch (error) {
      console.error('Error deleting home slideshow image:', error);
      alert('Failed to delete home slideshow image');
    }
  };

  const handleSaveHeadshot = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!headshotUrl.trim()) {
      alert('Please provide a headshot image URL');
      return;
    }

    setSavingHeadshot(true);
    try {
      // For simplicity, always use a single document 'main'
      const headshotDocRef = doc(db, 'headshots', 'main');
      await setDoc(headshotDocRef, {
        url: headshotUrl.trim(),
        name: headshotName.trim() || 'Headshot',
        updatedAt: serverTimestamp()
      });

      setHeadshot({
        url: headshotUrl.trim(),
        name: headshotName.trim() || 'Headshot',
        updatedAt: new Date()
      });

      alert('Headshot updated successfully!');
    } catch (error) {
      console.error('Error saving headshot:', error);
      alert('Failed to save headshot');
    } finally {
      setSavingHeadshot(false);
    }
  };

  const handleClearHeadshot = async () => {
    if (!window.confirm('Remove the current headshot? This will fall back to the default image.')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'headshots', 'main'));
      setHeadshot(null);
      setHeadshotUrl('');
      setHeadshotName('');
    } catch (error) {
      console.error('Error clearing headshot:', error);
      alert('Failed to clear headshot');
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return <div className="loading">Loading images...</div>;
  }

  return (
    <div className="image-library">
      <div className="section-header">
        <h2>Image Library</h2>
        <p className="section-description">
          Add and manage images for your website. Copy URLs to use in blog posts or page content.
        </p>
      </div>

      <form onSubmit={handleUpload} className="upload-form">
        <div className="form-group">
          <label htmlFor="imageName">Image Name</label>
          <input
            type="text"
            id="imageName"
            value={newImageName}
            onChange={(e) => setNewImageName(e.target.value)}
            placeholder="e.g., Sailing Sunset"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
        <button type="submit" className="btn-upload" disabled={uploading}>
          {uploading ? 'Adding...' : '+ Add Image'}
        </button>
      </form>

      {images.length === 0 ? (
        <div className="empty-state">
          <p>No images yet. Add your first image!</p>
        </div>
      ) : (
        <div className="images-grid">
          {images.map(image => (
            <div key={image.id} className="image-card">
              <div className="image-preview">
                <img src={image.url} alt={image.name} />
              </div>
              <div className="image-info">
                <h3>{image.name}</h3>
                <div className="image-url">
                  <input 
                    type="text" 
                    value={image.url} 
                    readOnly 
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button 
                    onClick={() => copyToClipboard(image.url, image.id)}
                    className="btn-copy"
                  >
                    {copiedId === image.id ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <button 
                  onClick={() => handleDelete(image.id)}
                  className="btn-delete-img"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="section-header" style={{ marginTop: '3rem' }}>
        <h2>Charters Slideshow Images</h2>
        <p className="section-description">
          Manage the images used in the Charters page slideshow. These images are loaded from Firestore.
        </p>
      </div>

      <form onSubmit={handleSlideUpload} className="upload-form">
        <div className="form-group">
          <label htmlFor="slideName">Slideshow Image Name</label>
          <input
            type="text"
            id="slideName"
            value={newSlideName}
            onChange={(e) => setNewSlideName(e.target.value)}
            placeholder="e.g., BVI Sunset Run"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="slideUrl">Slideshow Image URL</label>
          <input
            type="url"
            id="slideUrl"
            value={newSlideUrl}
            onChange={(e) => setNewSlideUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
          />
        </div>
        <button type="submit" className="btn-upload" disabled={uploadingSlide}>
          {uploadingSlide ? 'Adding...' : '+ Add Slideshow Image'}
        </button>
      </form>

      {loadingSlides ? (
        <div className="loading">Loading slideshow images...</div>
      ) : slideshowImages.length === 0 ? (
        <div className="empty-state">
          <p>No slideshow images yet. Add your first slideshow image!</p>
        </div>
      ) : (
        <div className="images-grid">
          {slideshowImages.map(image => (
            <div key={image.id} className="image-card">
              <div className="image-preview">
                <img src={image.url} alt={image.name} />
              </div>
              <div className="image-info">
                <h3>{image.name}</h3>
                <div className="image-url">
                  <input 
                    type="text" 
                    value={image.url} 
                    readOnly 
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button 
                    onClick={() => copyToClipboard(image.url, image.id)}
                    className="btn-copy"
                  >
                    {copiedId === image.id ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <button 
                  onClick={() => handleDeleteSlide(image.id)}
                  className="btn-delete-img"
                >
                  Remove from Slideshow
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="section-header" style={{ marginTop: '3rem' }}>
        <h2>Home Page Slideshow Images</h2>
        <p className="section-description">
          Manage the images used in the Home page slideshow gallery. These are separate from the Charters gallery.
        </p>
      </div>

      <form onSubmit={handleHomeSlideUpload} className="upload-form">
        <div className="form-group">
          <label htmlFor="homeSlideName">Home Slideshow Image Name</label>
          <input
            type="text"
            id="homeSlideName"
            value={newHomeSlideName}
            onChange={(e) => setNewHomeSlideName(e.target.value)}
            placeholder="e.g., Morning Harbor"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="homeSlideUrl">Home Slideshow Image URL</label>
          <input
            type="url"
            id="homeSlideUrl"
            value={newHomeSlideUrl}
            onChange={(e) => setNewHomeSlideUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
          />
        </div>
        <button type="submit" className="btn-upload" disabled={uploadingHomeSlide}>
          {uploadingHomeSlide ? 'Adding...' : '+ Add Home Slideshow Image'}
        </button>
      </form>

      {loadingHomeSlides ? (
        <div className="loading">Loading home slideshow images...</div>
      ) : homeSlides.length === 0 ? (
        <div className="empty-state">
          <p>No home slideshow images yet. Add your first home slideshow image!</p>
        </div>
      ) : (
        <div className="images-grid">
          {homeSlides.map(image => (
            <div key={image.id} className="image-card">
              <div className="image-preview">
                <img src={image.url} alt={image.name} />
              </div>
              <div className="image-info">
                <h3>{image.name}</h3>
                <div className="image-url">
                  <input
                    type="text"
                    value={image.url}
                    readOnly
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button
                    onClick={() => copyToClipboard(image.url, image.id)}
                    className="btn-copy"
                  >
                    {copiedId === image.id ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <button
                  onClick={() => handleDeleteHomeSlide(image.id)}
                  className="btn-delete-img"
                >
                  Remove from Home Slideshow
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="section-header" style={{ marginTop: '3rem' }}>
        <h2>About Me Headshot</h2>
        <p className="section-description">
          Set the main headshot image used on the About Me page.
        </p>
      </div>

      <form onSubmit={handleSaveHeadshot} className="upload-form">
        <div className="form-group">
          <label htmlFor="headshotName">Headshot Name (optional)</label>
          <input
            type="text"
            id="headshotName"
            value={headshotName}
            onChange={(e) => setHeadshotName(e.target.value)}
            placeholder="e.g., Brian Headshot"
          />
        </div>
        <div className="form-group">
          <label htmlFor="headshotUrl">Headshot Image URL</label>
          <input
            type="url"
            id="headshotUrl"
            value={headshotUrl}
            onChange={(e) => setHeadshotUrl(e.target.value)}
            placeholder="https://example.com/headshot.jpg"
            required
          />
        </div>
        <button type="submit" className="btn-upload" disabled={savingHeadshot}>
          {savingHeadshot ? 'Saving...' : 'Save Headshot'}
        </button>
      </form>

      {loadingHeadshot ? (
        <div className="loading">Loading headshot...</div>
      ) : !headshot || !headshot.url ? (
        <div className="empty-state">
          <p>No headshot set yet. Add a headshot image above.</p>
        </div>
      ) : (
        <div className="images-grid">
          <div className="image-card">
            <div className="image-preview">
              <img src={headshot.url} alt={headshot.name || 'Headshot'} />
            </div>
            <div className="image-info">
              <h3>{headshot.name || 'Headshot'}</h3>
              <div className="image-url">
                <input 
                  type="text" 
                  value={headshot.url} 
                  readOnly 
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button 
                  onClick={() => copyToClipboard(headshot.url, 'headshot')}
                  className="btn-copy"
                >
                  {copiedId === 'headshot' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <button 
                onClick={handleClearHeadshot}
                className="btn-delete-img"
              >
                Remove Headshot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageLibrary;

