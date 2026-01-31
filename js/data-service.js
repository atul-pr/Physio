// Data Service for Mangala Hospital Physiocare Website
// Handles all LocalStorage operations and data management

const DataService = {
  STORAGE_KEY: 'mangalaPhysioData',

  // Default data structure
  getDefaultData() {
    return {
      clinic: {
        name: 'Mangala Hospital Physiocare & Sports',
        tagline: 'Relieve pain, Recapture life again.',
        logo: 'images/logo.jpg',
        phone: '+91 9876543210',
        email: 'info@mangalaphysiocare.com',
        whatsapp: '+919876543210',
        address: 'Mangala Hospital, Sports Rehab Center, City, State - 123456'
      },
      hero: {
        title: 'Expert Physiotherapy & Sports Rehabilitation',
        subtitle: 'Your journey to recovery starts here. Professional care with compassionate hearts.',
        ctaText: 'Book Appointment',
        ctaLink: '#contact'
      },
      about: {
        title: 'About Mangala Physiocare',
        content: 'At Mangala Hospital Physiocare & Sports Rehab Center, we are dedicated to helping you recover from pain and injuries. Our team of experienced physiotherapists uses evidence-based treatments combined with state-of-the-art equipment to deliver the best possible outcomes. Whether you\'re recovering from a sports injury, managing chronic pain, or seeking post-operative rehabilitation, we\'re here to help you recapture life again.'
      },
      services: [
        {
          id: 1,
          name: 'Sports Injury Rehabilitation',
          description: 'Specialized treatment for sports-related injuries including sprains, strains, and fractures.',
          icon: '🏃'
        },
        {
          id: 2,
          name: 'Manual Therapy',
          description: 'Hands-on techniques to reduce pain, improve mobility, and restore function.',
          icon: '👐'
        },
        {
          id: 3,
          name: 'Post-Operative Care',
          description: 'Comprehensive rehabilitation programs following surgery to ensure optimal recovery.',
          icon: '🏥'
        },
        {
          id: 4,
          name: 'Pain Management',
          description: 'Advanced techniques to manage chronic and acute pain conditions.',
          icon: '💆'
        },
        {
          id: 5,
          name: 'Electrotherapy',
          description: 'Modern electrical modalities for pain relief and tissue healing.',
          icon: '⚡'
        },
        {
          id: 6,
          name: 'Exercise Therapy',
          description: 'Customized exercise programs to improve strength, flexibility, and endurance.',
          icon: '💪'
        }
      ],
      exercises: [
        {
          id: 1,
          name: 'Therapeutic Exercises',
          description: 'Personalized exercise programs designed to restore mobility and strength'
        },
        {
          id: 2,
          name: 'Dry Needling',
          description: 'Advanced technique for muscle pain and trigger point release'
        },
        {
          id: 3,
          name: 'Cupping Therapy',
          description: 'Traditional therapy for muscle relaxation and pain relief'
        },
        {
          id: 4,
          name: 'Kinesio Taping',
          description: 'Specialized taping techniques for support and pain reduction'
        },
        {
          id: 5,
          name: 'Ultrasound Therapy',
          description: 'Deep tissue treatment using sound waves for healing'
        },
        {
          id: 6,
          name: 'LASER Therapy',
          description: 'Low-level laser for accelerated tissue repair and pain relief'
        }
      ],
      contact: {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9476519598093!2d-73.99099368459418!3d40.74844097932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123',
        latitude: '40.748441',
        longitude: '-73.989992'
      },
      footer: {
        text: 'Trusted healthcare partner for your rehabilitation needs. Professional, caring, and result-oriented.',
        copyright: '© 2026 Mangala Hospital Physiocare. All rights reserved.'
      },
      social: {
        facebook: 'https://facebook.com/mangalaphysiocare',
        instagram: 'https://instagram.com/mangalaphysiocare',
        twitter: 'https://twitter.com/mangalaphysio',
        linkedin: 'https://linkedin.com/company/mangalaphysiocare'
      },
      seo: {
        title: 'Mangala Hospital Physiocare & Sports Rehab Center - Expert Physiotherapy',
        description: 'Professional physiotherapy and sports rehabilitation services. Expert care for pain relief, injury recovery, and performance enhancement. Book your appointment today.'
      }
    };
  },

  // Initialize data if not exists
  init() {
    const existingData = this.getData();
    if (!existingData) {
      this.saveData(this.getDefaultData());
    }
  },

  // Get all data
  getData() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  },

  // Save all data
  saveData(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  },

  // Update specific section
  updateSection(section, data) {
    const allData = this.getData() || this.getDefaultData();
    allData[section] = data;
    return this.saveData(allData);
  },

  // Get specific section
  getSection(section) {
    const data = this.getData();
    return data ? data[section] : null;
  },

  // Services CRUD
  addService(service) {
    const data = this.getData();
    const services = data.services || [];
    const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    service.id = newId;
    services.push(service);
    return this.updateSection('services', services);
  },

  updateService(id, updatedService) {
    const data = this.getData();
    const services = data.services || [];
    const index = services.findIndex(s => s.id === id);
    if (index !== -1) {
      services[index] = { ...services[index], ...updatedService, id };
      return this.updateSection('services', services);
    }
    return false;
  },

  deleteService(id) {
    const data = this.getData();
    const services = data.services || [];
    const filtered = services.filter(s => s.id !== id);
    return this.updateSection('services', filtered);
  },

  // Exercises CRUD
  addExercise(exercise) {
    const data = this.getData();
    const exercises = data.exercises || [];
    const newId = exercises.length > 0 ? Math.max(...exercises.map(e => e.id)) + 1 : 1;
    exercise.id = newId;
    exercises.push(exercise);
    return this.updateSection('exercises', exercises);
  },

  updateExercise(id, updatedExercise) {
    const data = this.getData();
    const exercises = data.exercises || [];
    const index = exercises.findIndex(e => e.id === id);
    if (index !== -1) {
      exercises[index] = { ...exercises[index], ...updatedExercise, id };
      return this.updateSection('exercises', exercises);
    }
    return false;
  },

  deleteExercise(id) {
    const data = this.getData();
    const exercises = data.exercises || [];
    const filtered = exercises.filter(e => e.id !== id);
    return this.updateSection('exercises', filtered);
  },

  // Export data as JSON
  exportData() {
    const data = this.getData();
    return JSON.stringify(data, null, 2);
  },

  // Import data from JSON
  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      return this.saveData(data);
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },

  // Reset to default
  resetToDefault() {
    return this.saveData(this.getDefaultData());
  }
};

// Initialize on load
DataService.init();
