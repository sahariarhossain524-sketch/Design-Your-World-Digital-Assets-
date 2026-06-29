import type { Product, Category, FontItem, PresentationItem } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Icons', slug: 'icons', itemCount: 3200, bgColor: '#E6E4FF', image: '/assets/category-icons-preview.jpg', subcategories: ['Line Icons', 'Filled Icons', 'Social Icons', 'Emoji', 'Arrows', 'UI Icons', 'File Icons', 'Weather Icons'] },
  { id: '2', name: 'Fonts', slug: 'fonts', itemCount: 850, bgColor: '#FFF2E2', image: '/assets/category-fonts-preview.jpg', subcategories: ['Sans Serif', 'Serif', 'Display', 'Script', 'Monospace', 'Handwritten'] },
  { id: '3', name: 'Templates', slug: 'templates', itemCount: 2400, bgColor: '#C8FFCA', image: '/assets/category-templates-preview.jpg', subcategories: ['Landing Pages', 'Dashboards', 'E-commerce', 'Blogs', 'Portfolios', 'Admin Panels'] },
  { id: '4', name: 'Presentations', slug: 'presentations', itemCount: 680, bgColor: '#FFE4E4', image: '/assets/category-presentations-preview.jpg', subcategories: ['Pitch Decks', 'Keynotes', 'Reports', 'Infographics', 'Education', 'Marketing'] },
  { id: '5', name: 'Mockups', slug: 'mockups', itemCount: 1100, bgColor: '#E6F2FF', image: '/assets/category-mockups-preview.jpg', subcategories: ['Device Mockups', 'Packaging', 'Print', 'Apparel', 'Stationery', '3D'] },
  { id: '6', name: 'UI Kits', slug: 'ui-kits', itemCount: 520, bgColor: '#F0E6FF', image: '/assets/category-uikits-preview.jpg', subcategories: ['Component Libraries', 'Design Systems', 'Wireframes', 'Mobile UI', 'Web UI'] },
  { id: '7', name: 'Social Media', slug: 'social-media', itemCount: 1800, bgColor: '#FFF8E6', image: '/assets/category-social-preview.jpg', subcategories: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'YouTube', 'TikTok'] },
  { id: '8', name: 'Illustrations', slug: 'illustrations', itemCount: 950, bgColor: '#E6FFE6', image: '/assets/category-illustrations-preview.jpg', subcategories: ['3D', 'Flat', 'Vector', 'Character', 'Abstract', 'Hand-drawn'] },
];

export const products: Product[] = [
  // FEATURED (User's Portfolio Projects)
  { id: 'f1', title: 'ShopMate - Premium E-commerce Store', slug: 'shopmate', category: 'Web App', subcategory: 'E-commerce', price: 0, originalPrice: 0, rating: 5.0, reviewCount: 42, image: '/assets/featured-neon-icons.jpg', description: 'A high-performance e-commerce storefront built with Next.js App Router, Prisma ORM, and Tailwind CSS. Features smooth Framer Motion animations, dynamic cart state management, and an ultra-modern UI.', tags: ['Next.js', 'Prisma', 'Tailwind CSS', 'Framer Motion'], featured: true },
  { id: 'f2', title: 'Full-Stack E-commerce Platform (NEXA)', slug: 'nexa-ecommerce', category: 'Web App', subcategory: 'E-commerce', price: 0, originalPrice: 0, rating: 4.9, reviewCount: 67, image: '/assets/featured-portfolio-template.jpg', description: 'A production-ready e-commerce platform orchestrated entirely via AI agents. Features secure user authentication, a real-time PostgreSQL database, and a live payment gateway integration.', tags: ['Next.js', 'Supabase', 'Clerk Auth', 'Stripe API'], featured: true },
  { id: 'f3', title: 'Kanban Board (Task Management)', slug: 'kanban-board', category: 'Web App', subcategory: 'Productivity', price: 0, originalPrice: 0, rating: 4.8, reviewCount: 31, image: '/assets/featured-modern-font.jpg', description: 'A robust drag-and-drop task management application built with Next.js and Tailwind CSS. Features complex state management, interactive UI components, and a modern project management aesthetic.', tags: ['Next.js', 'React DND', 'Tailwind CSS', 'Zustand'], featured: true },
  { id: 'f4', title: 'AI Dashboard (SaaS App)', slug: 'ai-dashboard', category: 'Web App', subcategory: 'SaaS', price: 0, originalPrice: 0, rating: 4.9, reviewCount: 88, image: '/assets/template-saas-landing.jpg', description: 'A modern, highly responsive AI SaaS Dashboard featuring dark mode support, interactive data visualizations with Recharts, and a premium UI component architecture.', tags: ['Next.js', 'Tailwind CSS', 'Recharts', 'Lucide React'], featured: true },

  // TEMPLATES
  { id: 't1', title: 'SaaS Landing Page', slug: 'saas-landing-page', category: 'Templates', subcategory: 'Landing Pages', price: 29, rating: 4.6, reviewCount: 24, image: '/assets/template-saas-landing.jpg', description: 'High-converting SaaS landing page template' },
  { id: 't2', title: 'Portfolio Dashboard', slug: 'portfolio-dashboard', category: 'Templates', subcategory: 'Portfolios', price: 24, rating: 4.5, reviewCount: 18, image: '/assets/template-portfolio.jpg', description: 'Dark-themed portfolio dashboard template' },
  { id: 't3', title: 'E-commerce Template', slug: 'ecommerce-template', category: 'Templates', subcategory: 'E-commerce', price: 34, rating: 4.8, reviewCount: 36, image: '/assets/template-ecommerce.jpg', description: 'Full-featured e-commerce website template' },
  { id: 't4', title: 'Admin Dashboard Kit', slug: 'admin-dashboard-kit', category: 'Templates', subcategory: 'Admin Panels', price: 39, rating: 4.7, reviewCount: 29, image: '/assets/template-admin.jpg', description: 'Analytics dashboard with charts and tables' },

  // ICONS
  { id: 'i1', title: 'Minimal Line Icons', slug: 'minimal-line-icons', category: 'Icons', subcategory: 'Line Icons', price: 12, rating: 4.5, reviewCount: 56, image: '/assets/featured-neon-icons.jpg', description: '200+ minimal line icons for web and app' },
  { id: 'i2', title: 'Social Media Icons', slug: 'social-media-icons', category: 'Icons', subcategory: 'Social Icons', price: 9, rating: 4.4, reviewCount: 38, image: '/assets/icons-hero-set.jpg', description: 'All social platform icons in one pack' },
  { id: 'i3', title: '3D Icon Collection', slug: '3d-icon-collection', category: 'Icons', subcategory: 'Filled Icons', price: 24, rating: 4.9, reviewCount: 71, image: '/assets/bundle-icon-collection.jpg', description: '100+ 3D-style icons for modern interfaces' },
  { id: 'i4', title: 'Arrow Icons Pack', slug: 'arrow-icons-pack', category: 'Icons', subcategory: 'Arrows', price: 7, rating: 4.3, reviewCount: 22, image: '/assets/icons-hero-set.jpg', description: '50 directional arrow icons' },
  { id: 'i5', title: 'Weather Icons Set', slug: 'weather-icons-set', category: 'Icons', subcategory: 'Weather Icons', price: 10, rating: 4.6, reviewCount: 19, image: '/assets/featured-neon-icons.jpg', description: 'Beautiful weather condition icons' },
  { id: 'i6', title: 'File Type Icons', slug: 'file-type-icons', category: 'Icons', subcategory: 'File Icons', price: 8, rating: 4.2, reviewCount: 15, image: '/assets/icons-hero-set.jpg', description: '50+ file extension icons' },
  { id: 'i7', title: 'UI Elements Icons', slug: 'ui-elements-icons', category: 'Icons', subcategory: 'UI Icons', price: 15, rating: 4.7, reviewCount: 43, image: '/assets/featured-neon-icons.jpg', description: 'Essential UI component icons' },
  { id: 'i8', title: 'Emoji Icon Pack', slug: 'emoji-icon-pack', category: 'Icons', subcategory: 'Emoji', price: 11, rating: 4.5, reviewCount: 27, image: '/assets/bundle-icon-collection.jpg', description: '80 fun emoji-style icons' },

  // FONTS
  { id: 'fn1', title: 'Elegant Serif Pro', slug: 'elegant-serif-pro', category: 'Fonts', subcategory: 'Serif', price: 32, rating: 4.8, reviewCount: 45, image: '/assets/font-montserrat-specimen.jpg', description: 'Professional serif font for editorial design' },
  { id: 'fn2', title: 'Bold Display Type', slug: 'bold-display-type', category: 'Fonts', subcategory: 'Display', price: 22, rating: 4.6, reviewCount: 33, image: '/assets/font-playfair-specimen.jpg', description: 'High-impact display typeface' },
  { id: 'fn3', title: 'Script Handwriting', slug: 'script-handwriting', category: 'Fonts', subcategory: 'Script', price: 18, rating: 4.4, reviewCount: 28, image: '/assets/font-montserrat-specimen.jpg', description: 'Beautiful script font for branding' },
  { id: 'fn4', title: 'Mono Code Font', slug: 'mono-code-font', category: 'Fonts', subcategory: 'Monospace', price: 14, rating: 4.7, reviewCount: 51, image: '/assets/font-playfair-specimen.jpg', description: 'Clean monospace font for developers' },

  // PRESENTATIONS
  { id: 'p1', title: 'Startup Pitch Deck', slug: 'startup-pitch-deck', category: 'Presentations', subcategory: 'Pitch Decks', price: 29, rating: 4.7, reviewCount: 38, image: '/assets/presentation-startup-pitch.jpg', description: 'Investor-ready startup pitch deck', slides: 24 },
  { id: 'p2', title: 'Annual Report', slug: 'annual-report', category: 'Presentations', subcategory: 'Reports', price: 34, rating: 4.5, reviewCount: 22, image: '/assets/presentation-annual-report.jpg', description: 'Professional annual report template', slides: 32 },
  { id: 'p3', title: 'Creative Agency', slug: 'creative-agency', category: 'Presentations', subcategory: 'Marketing', price: 24, rating: 4.6, reviewCount: 19, image: '/assets/presentation-startup-pitch.jpg', description: 'Agency showcase presentation', slides: 18 },
  { id: 'p4', title: 'Product Launch', slug: 'product-launch', category: 'Presentations', subcategory: 'Pitch Decks', price: 31, rating: 4.8, reviewCount: 41, image: '/assets/presentation-annual-report.jpg', description: 'Product launch presentation kit', slides: 28 },
  { id: 'p5', title: 'Minimal Keynote', slug: 'minimal-keynote', category: 'Presentations', subcategory: 'Keynotes', price: 22, rating: 4.3, reviewCount: 16, image: '/assets/presentation-startup-pitch.jpg', description: 'Clean minimal keynote template', slides: 20 },
  { id: 'p6', title: 'Data Visualization', slug: 'data-visualization', category: 'Presentations', subcategory: 'Infographics', price: 39, rating: 4.9, reviewCount: 53, image: '/assets/presentation-annual-report.jpg', description: 'Data-driven presentation with charts', slides: 36 },

  // MOCKUPS
  { id: 'm1', title: 'iPhone Mockup Pack', slug: 'iphone-mockup-pack', category: 'Mockups', subcategory: 'Device Mockups', price: 19, rating: 4.6, reviewCount: 47, image: '/assets/category-mockups-preview.jpg', description: '10 realistic iPhone mockups' },
  { id: 'm2', title: 'MacBook Pro Mockups', slug: 'macbook-pro-mockups', category: 'Mockups', subcategory: 'Device Mockups', price: 22, rating: 4.7, reviewCount: 39, image: '/assets/category-mockups-preview.jpg', description: '8 MacBook Pro scene mockups' },
  { id: 'm3', title: 'Packaging Box Mockup', slug: 'packaging-box-mockup', category: 'Mockups', subcategory: 'Packaging', price: 16, rating: 4.4, reviewCount: 21, image: '/assets/category-mockups-preview.jpg', description: 'Product packaging box mockups' },
  { id: 'm4', title: 'T-Shirt Mockup Set', slug: 'tshirt-mockup-set', category: 'Mockups', subcategory: 'Apparel', price: 14, rating: 4.3, reviewCount: 18, image: '/assets/category-mockups-preview.jpg', description: 'Apparel mockup collection' },

  // UI KITS
  { id: 'u1', title: 'Design System Pro', slug: 'design-system-pro', category: 'UI Kits', subcategory: 'Design Systems', price: 49, rating: 4.9, reviewCount: 62, image: '/assets/category-uikits-preview.jpg', description: 'Complete design system with 500+ components' },
  { id: 'u2', title: 'Mobile UI Kit', slug: 'mobile-ui-kit', category: 'UI Kits', subcategory: 'Mobile UI', price: 34, rating: 4.6, reviewCount: 35, image: '/assets/category-uikits-preview.jpg', description: 'iOS and Android UI components' },
  { id: 'u3', title: 'Wireframe Kit', slug: 'wireframe-kit', category: 'UI Kits', subcategory: 'Wireframes', price: 19, rating: 4.5, reviewCount: 28, image: '/assets/category-uikits-preview.jpg', description: 'Low-fi wireframe components' },
  { id: 'u4', title: 'Web UI Components', slug: 'web-ui-components', category: 'UI Kits', subcategory: 'Web UI', price: 29, rating: 4.7, reviewCount: 41, image: '/assets/category-uikits-preview.jpg', description: 'Modern web UI component library' },

  // SOCIAL MEDIA
  { id: 's1', title: 'Instagram Story Pack', slug: 'instagram-story-pack', category: 'Social Media', subcategory: 'Instagram', price: 18, rating: 4.5, reviewCount: 33, image: '/assets/category-social-preview.jpg', description: '30 Instagram story templates' },
  { id: 's2', title: 'Facebook Ad Templates', slug: 'facebook-ad-templates', category: 'Social Media', subcategory: 'Facebook', price: 15, rating: 4.3, reviewCount: 19, image: '/assets/category-social-preview.jpg', description: '20 Facebook ad designs' },
  { id: 's3', title: 'YouTube Thumbnail Kit', slug: 'youtube-thumbnail-kit', category: 'Social Media', subcategory: 'YouTube', price: 12, rating: 4.6, reviewCount: 27, image: '/assets/category-social-preview.jpg', description: '25 YouTube thumbnail templates' },
  { id: 's4', title: 'TikTok Video Templates', slug: 'tiktok-video-templates', category: 'Social Media', subcategory: 'TikTok', price: 16, rating: 4.4, reviewCount: 22, image: '/assets/category-social-preview.jpg', description: '15 TikTok video frame templates' },

  // ILLUSTRATIONS
  { id: 'il1', title: '3D Character Pack', slug: '3d-character-pack', category: 'Illustrations', subcategory: '3D', price: 35, rating: 4.8, reviewCount: 44, image: '/assets/category-illustrations-preview.jpg', description: '20 3D character illustrations' },
  { id: 'il2', title: 'Flat Vector Scenes', slug: 'flat-vector-scenes', category: 'Illustrations', subcategory: 'Flat', price: 22, rating: 4.5, reviewCount: 31, image: '/assets/category-illustrations-preview.jpg', description: '30 flat vector scene illustrations' },
  { id: 'il3', title: 'Abstract Shapes', slug: 'abstract-shapes', category: 'Illustrations', subcategory: 'Abstract', price: 16, rating: 4.3, reviewCount: 18, image: '/assets/category-illustrations-preview.jpg', description: '50 abstract geometric shapes' },
  { id: 'il4', title: 'Hand-drawn Elements', slug: 'hand-drawn-elements', category: 'Illustrations', subcategory: 'Hand-drawn', price: 14, rating: 4.2, reviewCount: 15, image: '/assets/category-illustrations-preview.jpg', description: '40 hand-drawn sketch elements' },
];

export const bundles: Product[] = [
  {
    id: 'b1', title: 'The Designer Starter Kit', slug: 'designer-starter-kit', category: 'Bundles', subcategory: 'Bundles', price: 49, originalPrice: 89, rating: 4.9, reviewCount: 128, image: '/assets/bundle-starter-kit.jpg',
    description: 'Everything you need to kickstart your design projects — 500+ icons, 50 fonts, 20 templates, and 10 mockups.',
    isBundle: true, items: ['500+ Icons', '50 Fonts', '20 Templates', '10 Mockups', '5 UI Kits'],
    tags: ['bundle', 'starter']
  },
  {
    id: 'b2', title: 'Social Media Pro Pack', slug: 'social-media-pro-pack', category: 'Bundles', subcategory: 'Bundles', price: 39, originalPrice: 69, rating: 4.8, reviewCount: 96, image: '/assets/bundle-social-pack.jpg',
    description: '120 social media templates, 30 story designs, 200 icons, and a complete brand guideline template.',
    isBundle: true, items: ['120 Templates', '30 Stories', '200 Icons', 'Brand Guide'],
    tags: ['bundle', 'social']
  },
];

export const carouselBundles: Product[] = [
  { id: 'cb1', title: 'Icon Master Collection', slug: 'icon-master-collection', category: 'Bundles', subcategory: 'Bundles', price: 59, originalPrice: 99, rating: 4.9, reviewCount: 156, image: '/assets/bundle-icon-collection.jpg', description: '1000+ icons in every style imaginable' },
  { id: 'cb2', title: 'Font Foundry Pack', slug: 'font-foundry-pack', category: 'Bundles', subcategory: 'Bundles', price: 79, originalPrice: 129, rating: 4.8, reviewCount: 112, image: '/assets/font-montserrat-specimen.jpg', description: '60 premium fonts for any project' },
  { id: 'cb3', title: 'Startup Template Kit', slug: 'startup-template-kit', category: 'Bundles', subcategory: 'Bundles', price: 69, originalPrice: 119, rating: 4.7, reviewCount: 89, image: '/assets/template-saas-landing.jpg', description: '15 production-ready templates' },
  { id: 'cb4', title: 'Presentation Pro Bundle', slug: 'presentation-pro-bundle', category: 'Bundles', subcategory: 'Bundles', price: 55, originalPrice: 95, rating: 4.8, reviewCount: 134, image: '/assets/presentation-startup-pitch.jpg', description: '40 stunning presentation templates' },
  { id: 'cb5', title: 'Mockup Mega Pack', slug: 'mockup-mega-pack', category: 'Bundles', subcategory: 'Bundles', price: 49, originalPrice: 89, rating: 4.6, reviewCount: 78, image: '/assets/category-mockups-preview.jpg', description: '80 premium device and product mockups' },
  { id: 'cb6', title: 'Social Media Essentials', slug: 'social-media-essentials', category: 'Bundles', subcategory: 'Bundles', price: 45, originalPrice: 79, rating: 4.7, reviewCount: 101, image: '/assets/category-social-preview.jpg', description: '60 social media templates for all platforms' },
  { id: 'cb7', title: 'UI Design System', slug: 'ui-design-system', category: 'Bundles', subcategory: 'Bundles', price: 89, originalPrice: 149, rating: 4.9, reviewCount: 167, image: '/assets/category-uikits-preview.jpg', description: 'Complete component library and design system' },
  { id: 'cb8', title: 'Illustration Vault', slug: 'illustration-vault', category: 'Bundles', subcategory: 'Bundles', price: 65, originalPrice: 109, rating: 4.8, reviewCount: 93, image: '/assets/category-illustrations-preview.jpg', description: '200+ illustrations in various styles' },
];

export const featuredProducts: Product[] = products.filter(p => p.featured);

export const fontItems: FontItem[] = [
  { name: 'Montserrat', category: 'Sans Serif', styles: 18, price: 25, specimen: 'The quick brown fox jumps over the lazy dog' },
  { name: 'Playfair Display', category: 'Serif', styles: 12, price: 29, specimen: 'The quick brown fox jumps over the lazy dog' },
  { name: 'Bebas Neue', category: 'Display', styles: 4, price: 15, specimen: 'THE QUICK BROWN FOX' },
  { name: 'Pacifico', category: 'Script', styles: 1, price: 19, specimen: 'The quick brown fox jumps' },
  { name: 'Roboto Slab', category: 'Slab Serif', styles: 8, price: 22, specimen: 'The quick brown fox jumps over the lazy dog' },
  { name: 'Oswald', category: 'Sans Serif', styles: 6, price: 18, specimen: 'THE QUICK BROWN FOX' },
  { name: 'Lora', category: 'Serif', styles: 8, price: 24, specimen: 'The quick brown fox jumps over the lazy dog' },
  { name: 'Poppins', category: 'Sans Serif', styles: 18, price: 28, specimen: 'The quick brown fox jumps over the lazy dog' },
];

export const presentationItems: PresentationItem[] = [
  { title: 'Startup Pitch Deck', slides: 24, price: 29, image: '/assets/presentation-startup-pitch.jpg' },
  { title: 'Annual Report', slides: 32, price: 34, image: '/assets/presentation-annual-report.jpg' },
  { title: 'Creative Agency', slides: 18, price: 24, image: '/assets/presentation-startup-pitch.jpg' },
  { title: 'Product Launch', slides: 28, price: 31, image: '/assets/presentation-annual-report.jpg' },
  { title: 'Minimal Keynote', slides: 20, price: 22, image: '/assets/presentation-startup-pitch.jpg' },
  { title: 'Data Visualization', slides: 36, price: 39, image: '/assets/presentation-annual-report.jpg' },
];

export const allProducts: Product[] = [...products, ...bundles, ...carouselBundles];
