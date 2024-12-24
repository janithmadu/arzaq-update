import Decimal from 'decimal.js';

export interface Category {
  id: number;
  title_en: string; // English title
  title_ar: string; // Arabic title
  slug: string; // URL-friendly identifier
  image_url: string | null; // Optional image URL, allowing null
  price: number | Decimal;
  subcategory:[{
    title_en:string,
    title_ar:string,
  }]
}

export interface SubcategoryNew {
  _id: string;
  title: {
    en: string;
    ar: string;
  };
}

export interface Subcategory {
  id: number;
  _id: string; // Document ID
  _type?: "subcategory"; // Type of the document
  title_en: string; // English title
  title_ar: string; // Arabic title
  slug: string; // URL-friendly identifier
  category?:Category[]
}

// Define the Brand interface for the main document structure
export interface Brand {
  id: string;
  title: {
    en: string; // English Title
    ar: string; // Arabic Title
  };
  slug: {
    _type: "slug"; // Type of the slug
    current: string; // Slug string
  };
  subcategory: {
    _type: "reference"; // Reference type
    _ref: string; // Reference ID to subcategory
  };
  description?: string; // Optional description field
  logo?: {
    _type: "image"; // Type of the image
    asset: {
      _type: "reference"; // Reference type for the asset
      _ref: string; // Reference ID to the image asset
    };
  };
}

export interface Option {
  title_en: string; // English title
  title_ar: string; // Arabic title
  
  optionvalue: Array<{
    value_en: string; // English value
    value_ar: string; // Arabic value
  }>; // An array of option values
  subcategories: Array<{
    _type: "reference"; // Type indicating it's a reference
    _ref: string; // Reference ID to the subcategory
  }>; // Array of references to subcategories
}

export interface Model {
  id: string;
  title: {
    en: string; // English title with a length between 2 and 50 characters
    ar: string; // Arabic title with a length between 2 and 50 characters
  };
  slug: {
    _type: "slug"; // Type of the slug
    current: string; // Slug value generated from the English title
  };
  subcategory: {
    _type: "reference"; // Type indicating it's a reference
    _ref: string; // Reference ID for subcategory
  };
  description?: string; // Optional description with a maximum length of 200 characters
}

export interface FormStateNew {
  ZodError: null;
  data: {
    name: string;
    category: string;
    subcategory: string;
    price: number;
    brand: string;
    model: string;
    conditions: string;
    authenticity: string;
    mobile: string;
    description: string;
    image?: string;
    options: string[];
    formDataObject: {
      name: "";
      subcategory: "";
      price: 0;
      brand: "";
      model: "";
      conditions: "";
      authenticity: "";
      Currency: "";
      description: "";
      options: [];
      mobile: "";
      country: "";
      state: "";
      negotiable: "";
      features: [];
    };
  };
  message: string | null;
  status: boolean;
  response: {
    Currency: string;
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
  };
  zodErrors: {
    name: string[];
    [key: string]: string[] | null;
  };
}

export interface PostAd {
  currency: string;
  adName: string;
  authenticity: string;
  backupPhoneNumber: string | null;
  brand: string;
  categoryId: string; // Use category ID directly
  categoryTitle: string; // Add title directly
  categorySlug: string; // Add slug directly
  city: string | null;
  category: {
    id: string;
    price: number;
    title_en:string
    title_ar:string
  };
  subcategory: {
    id: string;
    title_en:string
    title_ar:string
  };
  condition: string;
  country: string;
  description: string;
  email: string | null;
  features: string[];
  location: string | null;
  mapLocation: string | null;
  model: string;
  negotiable: string;
  phoneNumber: string;
  photos: Array<{ asset?: { _id?: string; url?: string }; alt?: string }>; // Adjusted photos structure
  postad_photos: Array<
    {
      _key: string;
      photoUrl: string; // Ensures URL format
      altText?: string; // Alt text is optional
    }>;
  price: number;
  state: string;
  subcategoryId: string; // Use subcategory ID directly
  subcategoryTitle: string; // Add title directly
  tags: string | null;
  website: string | null;
  id: string;
  createdAt: string;
}
export interface UpdateAd {
  currency: string;
  adName: string;
  authenticity: string;
  backupPhoneNumber: string | null;

  brand: string
  categoryId: string; // Use category ID directly
  categoryTitle: string; // Add title directly
  categorySlug: string; // Add slug directly
  city: string | null;
  category: {
    _type: "reference"; // Type indicating it's a reference
    _id: string;
    _ref: string; // Reference ID for subcategory
    price: number;
    title: {
      en: string;
      ar: string;
    };
  };
  subcategory: {
    _id: string;
    _type: "reference"; // Type indicating it's a reference
    _ref: string; // Reference ID for subcategory
    price: number;
    title: {
      en: string;
      ar: string;
    };
  };
  options: {
    key?: string
    value?: string
    _key?: string
  }
  condition: string;
  country: string;
  description: string;
  email: string | null;
  features: string[];
  location: string | null;
  mapLocation: string | null;
  model: string;
  negotiable: boolean;
  phoneNumber: string;
  photos: string[]; // Adjusted photos structure
  image: Array<
    {
      _key: string;
      url: string; // Ensures URL format
      altText?: string; // Alt text is optional
    }>;
  price: number;
  state: string;
  subcategoryId: string; // Use subcategory ID directly
  subcategoryTitle: string; // Add title directly
  tags: string | null;
  website: string | null;
  _id: string;
  _createdAt: string;

  user: {
    externalId: string
  }
}

export interface AdFormState<T> {
  errors?: StringMap;
  successMsg?: string;
  data?: T
  blurs?: StringToBoolMap
}

export interface StringMap {
  [key: string]: string;
}
export interface StringToBoolMap {
  [key: string]: boolean;
}

