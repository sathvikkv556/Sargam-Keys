import { APIResponse } from '@/types';

/**
 * Helper function for making API requests
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const url = `${baseUrl}/api${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Wrapper for GET requests
 */
export async function get<T>(endpoint: string): Promise<APIResponse<T>> {
  return apiRequest<T>(endpoint, { method: 'GET' });
}

/**
 * Wrapper for POST requests
 */
export async function post<T>(
  endpoint: string,
  data: any
): Promise<APIResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Wrapper for PUT requests
 */
export async function put<T>(
  endpoint: string,
  data: any
): Promise<APIResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Wrapper for DELETE requests
 */
export async function remove<T>(endpoint: string): Promise<APIResponse<T>> {
  return apiRequest<T>(endpoint, { method: 'DELETE' });
}
