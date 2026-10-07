export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  articlesAmount?: number;
  createdAt: string;
}

export interface LocationsResponse {
  page: number;
  perPage: number;
  totalLocations: number;
  totalPages: number;
  locations: Location[];
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

export interface UserLocationsResponse {
  data: Location[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface UserProfileResponse {
  status: number;
  message: string;
  data: UserProfile;
}

export interface CurrentUserResponse {
  status: number;
  message: string;
  data: {
    id: string;
  };
}
