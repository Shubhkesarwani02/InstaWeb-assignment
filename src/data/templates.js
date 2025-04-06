export const templatesData = [
    {
      id: 'business',
      name: 'Business Website',
      description: 'Professional template for small businesses and companies',
      previewUrl: '/src/assets/images/template-thumbnails/business.jpg',
      backgroundUrl: '/src/assets/images/template-thumbnails/business.jpg',
      dimensions: { width: 1200, height: 1800 },
      dropZones: [
        { x: 100, y: 100, width: 1000, height: 200 }, // Header
        { x: 100, y: 350, width: 1000, height: 500 }, // Main content
        { x: 100, y: 900, width: 350, height: 350 }, // Feature 1
        { x: 475, y: 900, width: 350, height: 350 }, // Feature 2
        { x: 850, y: 900, width: 350, height: 350 }, // Feature 3
        { x: 100, y: 1300, width: 1000, height: 300 }, // Contact section
      ],
      category: 'business'
    },
    {
      id: 'portfolio',
      name: 'Creative Portfolio',
      description: 'Showcase your work with this elegant portfolio template',
      previewUrl: '/src/assets/images/template-thumbnails/portfolio.jpg',
      backgroundUrl: '/src/assets/images/template-thumbnails/portfolio.jpg',
      dimensions: { width: 1200, height: 2000 },
      dropZones: [
        { x: 100, y: 100, width: 1000, height: 300 }, // Header & intro
        { x: 100, y: 450, width: 350, height: 350 }, // Portfolio item 1
        { x: 475, y: 450, width: 350, height: 350 }, // Portfolio item 2
        { x: 850, y: 450, width: 350, height: 350 }, // Portfolio item 3
        { x: 100, y: 850, width: 350, height: 350 }, // Portfolio item 4
        { x: 475, y: 850, width: 350, height: 350 }, // Portfolio item 5
        { x: 850, y: 850, width: 350, height: 350 }, // Portfolio item 6
        { x: 100, y: 1250, width: 1000, height: 400 }, // About section
        { x: 100, y: 1700, width: 1000, height: 200 }, // Contact section
      ],
      category: 'portfolio'
    },
    {
      id: 'blog',
      name: 'Blog Template',
      description: 'Clean and minimalist blog layout',
      previewUrl: '/src/assets/images/template-thumbnails/blog.jpg',
      backgroundUrl: '/src/assets/images/template-thumbnails/blog.jpg',
      dimensions: { width: 1200, height: 1600 },
      dropZones: [
        { x: 100, y: 100, width: 1000, height: 200 }, // Header
        { x: 100, y: 350, width: 700, height: 1000 }, // Blog content
        { x: 850, y: 350, width: 250, height: 800 }, // Sidebar
      ],
      category: 'blog'
    }
  ];
  
  export default templatesData;