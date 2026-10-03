export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  articlesAmount?: number;
  createdAt: string;
}

export interface Location {
  _id: string;
  name: string;
  locationType: string;
  region: string;
  image: string;
  description?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
  rate?: number;
  rating?: number;
  feedbacksId?: string[];
  ownerId?: string;
  createdAt: string;
}

export interface LocationsResponse {
  page: number;
  perPage: number;
  totalLocations: number;
  totalPages: number;
  locations: Location[];
}