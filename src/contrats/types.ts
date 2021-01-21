/* eslint-disable camelcase */
export interface User {
  id?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  avatar?: string;
  bi?: string;
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  province?: string;
  username?: string;
  email?: string;
  is_banned?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  permissions?: string[];
  roles?: Role[];
  role?: string;
  [key: string]: any;
}

export interface Role {
  id: string;
  label: string;
  description: string;
  slug: string;
  permissions: Permission[];
  created_at: string;
  updated_at: string;
  deleted_at: string;
  permissions_count: number;
}

export interface Permission {
  id: string;
  label: string;
  description: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id?: string;
  reference?: string;
  type?: string;
  owner?: string;
  recovered_at?: string;
  emitted_at?: string;
  created_at?: string;
  updated_at?: string;
  commentary?: string;
  agency_id?: string;
  agency?: Agency;
  recorder_id?: string;
  recorder?: User;
  finder?: Finder;
  finder_id?: string;
}

export interface Agency {
  id?: string;
  name?: string;
  address?: string;
  phone?: string;
  province?: string;
  is_open?: boolean;
  director_id?: string;
  director?: User;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface Finder {
  id?: string;
  first_name?: string;
  last_name?: string;
  bi?: string;
  phone?: string;
  gender?: string;
  age?: string;
  job?: string;
  address?: string;
  province?: string;
  is_open?: boolean;
  recorder_id?: string;
  recorder?: User;
  agency_id?: string;
  agency?: Agency;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
