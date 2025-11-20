import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
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

  useEffect(() => {
    fetchImages();
    fetchSlideshowImages();
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
    </div>
  );
};

export default ImageLibrary;

