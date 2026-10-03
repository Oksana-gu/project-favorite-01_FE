export interface LocationOwner {
  _id: string;
  name: string;
}

export interface RegionInfo {
  _id: string;
  region: string;
  slug: string;
  level: "регіональне" | "обласне" | "локальне" | string;
  note?: string;
}

export interface LocationTypeInfo {
  _id: string;
  type: string;
  slug: string;
  shortDescription?: string;
}

export interface LocationDetails {
  _id: string;
  name: string;
  image?: string | null;
  description?: string;
  region: string;
  locationType: string;
  
  coordinates?: {
    lat: number;
    lon: number;
  } | null;

  regionInfo?: RegionInfo;
  locationTypeInfo?: LocationTypeInfo;

  latitude?: number;
  longitude?: number;

  rate?: number;
  ownerId?: LocationOwner | string | null;
  createdAt?: string;
  updatedAt?: string;
}