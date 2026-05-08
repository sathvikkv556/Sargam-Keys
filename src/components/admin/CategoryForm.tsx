'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createCategory, updateCategory } from '@/lib/actions/category';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Category } from '@/types';

const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  order: z.string().transform((val) => parseInt(val, 10)).or(z.number()),
});

interface CategoryFormProps {
  initialData?: Category | null;
  onSuccess?: () => void;
}

export function CategoryForm({ initialData, onSuccess }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      order: 0,
    },
  });

  // Synchronize form with initialData when it changes
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description || '',
        order: initialData.order,
      });
    } else {
      reset({
        name: '',
        description: '',
        order: 0,
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = initialData
        ? await updateCategory(initialData._id, data)
        : await createCategory(data);

      if (response.success) {
        toast.success(initialData ? 'Category updated successfully' : 'Category created successfully');
        if (!initialData) reset();
        if (onSuccess) onSuccess();
        router.refresh();
      } else {
        toast.error(response.error || `Failed to ${initialData ? 'update' : 'create'} category`);
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Category' : 'Add New Category'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Name</label>
            <Input {...register('name')} placeholder="e.g. Bollywood" />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message as string}</p>}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea {...register('description')} placeholder="Category description..." />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Display Order</label>
            <Input type="number" {...register('order')} />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (initialData ? 'Updating...' : 'Adding...') : (initialData ? 'Update Category' : 'Add Category')}
            </Button>
            {initialData && (
              <Button type="button" variant="outline" onClick={onSuccess}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
