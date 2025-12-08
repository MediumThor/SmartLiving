import { useEffect, useState } from 'react';
import LessonInquiryModal from '../components/LessonInquiryModal';
import './Page.css';

const Lessons = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || '0.5';
        const yPos = -(scrolled * parseFloat(speed));
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInquire = (lessonType: string) => {
    setSelectedLesson(lessonType);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLesson('');
  };

  return (
    <div className="page-container">
      <section className="parallax-hero">
        <div 
          className="parallax-hero-image parallax" 
          data-speed="0.4"
          style={{
            backgroundImage: 'url(https://i.imgur.com/zcrHAkd.jpeg)'
          }}
        >
          <div className="parallax-overlay">
            <h1>Sailing Lessons</h1>
          </div>
        </div>
      </section>

      <div className="page-content">
        <div className="content-section">
          <p className="lead">
            Learn to sail with personalized instruction tailored to your experience level. 
            Whether you're a complete beginner or looking to refine your skills, I offer 
            hands-on lessons that build confidence and competence on the water.
          </p>
        </div>

        <div className="content-section">
          <h2>Course Catalog</h2>
          <div className="course-catalog-grid">
            <div className="course-card">
              <div className="course-header">
                <h3>101 Basic Keelboat</h3>
              </div>
              <div className="course-content">
                <div className="course-section">
                  <h4>Course Overview</h4>
                  <p>Basic sailing terminology, vessel parts, functions & seamanship.</p>
                </div>
                <div className="course-section">
                  <h4>Prerequisites</h4>
                  <p>None</p>
                </div>
                <div className="course-section">
                  <h4>Course Details</h4>
                  <p><strong>Duration:</strong> 2 days</p>
                  <p><strong>Fleet:</strong> 28'-31' Sloop</p>
                  <p><strong>Group Size:</strong> 3-5 People</p>
                </div>
                <div className="course-section">
                  <h4>Success Metrics</h4>
                  <p>• Pass rate</p>
                  <p>• Student testimonials</p>
                  <p>• Safety record</p>
                </div>
                <div className="course-section">
                  <h4>Pricing & Scheduling</h4>
                  <p><strong>$375</strong></p>
                  <p>• Weekends available</p>
                  <p>• ASA Book & Fees Included</p>
                </div>
              </div>
              <div className="course-card-button">
                <button
                  onClick={() => handleInquire('101 Basic Keelboat')}
                  className="course-inquire-button"
                >
                  Inquire About This Course
                </button>
              </div>
            </div>

            <div className="course-card">
              <div className="course-header">
                <h3>103/104 Coastal Bareboat Cruising</h3>
              </div>
              <div className="course-content">
                <div className="course-section">
                  <h4>Course Overview</h4>
                  <p>Boat systems, docking, anchoring, weather interpretations. Basic navigation, safety & seamanship.</p>
                </div>
                <div className="course-section">
                  <h4>Prerequisites</h4>
                  <p>101</p>
                </div>
                <div className="course-section">
                  <h4>Course Details</h4>
                  <p><strong>Duration:</strong> 3 days</p>
                  <p><strong>Fleet:</strong> 35-45' Sloop</p>
                  <p><strong>Group Size:</strong> 3-5 People</p>
                </div>
                <div className="course-section">
                  <h4>Success Metrics</h4>
                  <p>• Pass rate</p>
                  <p>• Student testimonials</p>
                  <p>• Safety record</p>
                </div>
                <div className="course-section">
                  <h4>Pricing & Scheduling</h4>
                  <p><strong>$875</strong></p>
                  <p>• Weekends available</p>
                  <p>• ASA Book & Fees Included</p>
                </div>
              </div>
              <div className="course-card-button">
                <button
                  onClick={() => handleInquire('103/104 Coastal Bareboat Cruising')}
                  className="course-inquire-button"
                >
                  Inquire About This Course
                </button>
              </div>
            </div>

            <div className="course-card">
              <div className="course-header">
                <h3>118 Docking Endorsement</h3>
              </div>
              <div className="course-content">
                <div className="course-section">
                  <h4>Course Overview</h4>
                  <p>Basic auxiliary-power theory, engine & steering controls. Dock line use. Crew communication.</p>
                </div>
                <div className="course-section">
                  <h4>Prerequisites</h4>
                  <p>None</p>
                </div>
                <div className="course-section">
                  <h4>Course Details</h4>
                  <p><strong>Duration:</strong> 2 days</p>
                  <p><strong>Fleet:</strong> 30'-40' Sloop</p>
                  <p><strong>Group Size:</strong> 3-5 People</p>
                </div>
                <div className="course-section">
                  <h4>Success Metrics</h4>
                  <p>• Pass rate</p>
                  <p>• Student testimonials</p>
                  <p>• Safety record</p>
                </div>
                <div className="course-section">
                  <h4>Pricing & Scheduling</h4>
                  <p><strong>$375</strong></p>
                  <p>• Weekends available</p>
                  <p>• ASA Book & Fees Included</p>
                </div>
              </div>
              <div className="course-card-button">
                <button
                  onClick={() => handleInquire('118 Docking Endorsement')}
                  className="course-inquire-button"
                >
                  Inquire About This Course
                </button>
              </div>
            </div>

            <div className="course-card">
              <div className="course-header">
                <h3>114 Cruising Catamaran</h3>
              </div>
              <div className="course-content">
                <div className="course-section">
                  <h4>Course Overview</h4>
                  <p>Catamaran structure, components and features, performance under sails and power.</p>
                </div>
                <div className="course-section">
                  <h4>Prerequisites</h4>
                  <p>101, 103, 104</p>
                </div>
                <div className="course-section">
                  <h4>Course Details</h4>
                  <p><strong>Duration:</strong> 2 days</p>
                  <p><strong>Fleet:</strong> 35'-45' Catamaran</p>
                  <p><strong>Group Size:</strong> 3-5 People</p>
                </div>
                <div className="course-section">
                  <h4>Success Metrics</h4>
                  <p>• Pass rate</p>
                  <p>• Student testimonials</p>
                  <p>• Safety record</p>
                </div>
                <div className="course-section">
                  <h4>Pricing & Scheduling</h4>
                  <p><strong>$815</strong></p>
                  <p>• Weekends available</p>
                  <p>• ASA Book & Fees Included</p>
                </div>
              </div>
              <div className="course-card-button">
                <button
                  onClick={() => handleInquire('114 Cruising Catamaran')}
                  className="course-inquire-button"
                >
                  Inquire About This Course
                </button>
              </div>
            </div>

            <div className="course-card">
              <div className="course-header">
                <h3>105 Coastal Navigation</h3>
              </div>
              <div className="course-content">
                <div className="course-section">
                  <h4>Course Overview</h4>
                  <p>Navigational Theory & Practices</p>
                </div>
                <div className="course-section">
                  <h4>Prerequisites</h4>
                  <p>101/103/104</p>
                </div>
                <div className="course-section">
                  <h4>Course Details</h4>
                  <p><strong>Duration:</strong> ONLINE CLASS*</p>
                  <p>*Private classes available upon request.</p>
                </div>
                <div className="course-section">
                  <h4>Success Metrics</h4>
                  <p>• Pass rate</p>
                  <p>• Student testimonials</p>
                  <p>• Safety record</p>
                </div>
                <div className="course-section">
                  <h4>Pricing & Scheduling</h4>
                  <p><strong>$450</strong></p>
                  <p>• Online</p>
                  <p>• * Call for private scheduling</p>
                </div>
              </div>
              <div className="course-card-button">
                <button
                  onClick={() => handleInquire('105 Coastal Navigation')}
                  className="course-inquire-button"
                >
                  Inquire About This Course
                </button>
              </div>
            </div>

            <div className="course-card">
              <div className="course-header">
                <h3>106 Advanced Cruising & Seamanship</h3>
              </div>
              <div className="course-content">
                <div className="course-section">
                  <h4>Course Overview</h4>
                  <p>Advanced cruising & overnight navigation & sailing.</p>
                </div>
                <div className="course-section">
                  <h4>Prerequisites</h4>
                  <p>101/103/104/105</p>
                </div>
                <div className="course-section">
                  <h4>Course Details</h4>
                  <p><strong>Duration:</strong> 3 days</p>
                  <p><strong>Fleet:</strong> 35'-45' Sloop</p>
                  <p><strong>Group Size:</strong> 3-5 People</p>
                </div>
                <div className="course-section">
                  <h4>Success Metrics</h4>
                  <p>• Pass rate</p>
                  <p>• Student testimonials</p>
                  <p>• Safety record</p>
                </div>
                <div className="course-section">
                  <h4>Pricing & Scheduling</h4>
                  <p><strong>$950</strong></p>
                  <p>• Weekends available</p>
                  <p>• ASA Book & Fees Included</p>
                </div>
              </div>
              <div className="course-card-button">
                <button
                  onClick={() => handleInquire('106 Advanced Cruising & Seamanship')}
                  className="course-inquire-button"
                >
                  Inquire About This Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LessonInquiryModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        lessonType={selectedLesson}
      />
    </div>
  );
};

export default Lessons;

