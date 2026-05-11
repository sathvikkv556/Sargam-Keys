'use client';

import { useEffect, useState, useCallback } from 'react';
import { getCategories } from '@/lib/actions/category';
import { CategoryForm } from '@/components/admin/CategoryForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Plus } from 'lucide-react';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const response = await getCategories();
    if (response.success) {
      setCategories(response.data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuccess = () => {
    setEditingCategory(null);
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Categories</h1>
          <p className="text-muted-foreground">Organize your songs into genres and styles.</p>
        </div>
        {editingCategory && (
          <Button onClick={() => setEditingCategory(null)} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Existing Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left font-medium">Name</th>
                      <th className="h-10 px-4 text-left font-medium">Slug</th>
                      <th className="h-10 px-4 text-left font-medium">Order</th>
                      <th className="h-10 px-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-muted-foreground">
                          Loading categories...
                        </td>
                      </tr>
                    ) : categories.length > 0 ? (
                      categories.map((cat) => (
                        <tr key={cat._id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 font-medium">{cat.name}</td>
                          <td className="p-4">{cat.slug}</td>
                          <td className="p-4">
                            <Badge variant="secondary">{cat.order}</Badge>
                          </td>
                          <td className="p-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEdit(cat)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-muted-foreground">
                          No categories found. Add your first category.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <CategoryForm 
            key={editingCategory?._id || 'new'} 
            initialData={editingCategory} 
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
}
