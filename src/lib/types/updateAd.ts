// Root interface representing all data for the PostAd model
export interface PostAd {
    id: number;
    adName: string;
    categoryId: number;
    subcategoryId: number;
    brand?: string | null;
    model?: string | null;
    condition?: PostAdCondition | null;
    currency?: PostAdCurrency | null;
    authenticity?: PostAdAuthenticity | null;
    price: string; // Decimal as string
    negotiable?: boolean | null;
    description?: string | null;
    phoneNumber: string;
    country: string;
    state?: string | null;
    location?: string | null;
    mapLatitude?: string | null; // Decimal as string
    mapLongitude?: string | null; // Decimal as string
    userId: number;
    payment?: boolean | null;
    viewCount?: number | null;
    createdAt: Date;
    updatedAt: Date;
    favorites: Favorite[];
    category: Category;
    subcategory: Subcategory;
    user: User;
    postad_features: PostAdFeature[];
    postad_options: PostAdOption[];
    postad_photos: PostAdPhoto[];
  }
  
  // Supporting interfaces
  export interface Subcategory {
    id: number;
    title_en: string;
    title_ar: string;
    slug: string;
    category_id: number;
    image?: string | null;
    description_en?: string | null;
    description_ar?: string | null;
    created_at: Date;
    updated_at: Date;
    brand: Brand[];
    model: Model[];
    optionsubcategory: OptionSubcategory[];
    postads: PostAd[];
    categories: Category;
  }
  
  export interface Category {
    id: number;
    title_en: string;
    title_ar: string;
    slug: string;
    image_url?: string | null;
    description_en?: string | null;
    description_ar?: string | null;
    price: string; // Decimal as string
    ad_count: number;
    created_at: Date;
    updated_at: Date;
    postads: PostAd[];
    subcategory: Subcategory[];
  }
  
  export interface PostAdFeature {
    id: number;
    postAdId: number;
    feature?: string | null;
    postad: PostAd;
  }
  
  export interface PostAdOption {
    id: number;
    postAdId: number;
    optionKey?: string | null;
    optionValue?: string | null;
    postad: PostAd;
  }
  
  export interface PostAdPhoto {
    id: number;
    postAdId: number;
    photoUrl?: string | null;
    altText?: string | null;
    postad: PostAd;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    // Add other fields as per your User model
  }
  
  export interface Favorite {
    id: number;
    postAdId: number;
    userId: number;
    postad: PostAd;
    user: User;
  }
  
  export interface Brand {
    id: number;
    name: string;
    subcategoryId: number;
  }
  
  export interface Model {
    id: number;
    name: string;
    subcategoryId: number;
  }
  
  export interface OptionSubcategory {
    id: number;
    key: string;
    value: string;
    subcategoryId: number;
  }
  
  // Enum placeholders
  export type PostAdCondition = "NEW" | "USED"; // Example, replace with actual values
  export type PostAdCurrency = "USD" | "EUR"; // Example, replace with actual values
  export type PostAdAuthenticity = "ORIGINAL" | "REPLICA"; // Example, replace with actual values
  