import { HeaderClient } from './client/HeaderClient';
import { getCategories } from '@/lib/actions/category';

/**
 * Server component that fetches categories and renders the HeaderClient
 */
export async function Header() {
  const response = await getCategories();
  const categories = response.success ? response.data || [] : [];

  return <HeaderClient initialCategories={categories} />;
}
