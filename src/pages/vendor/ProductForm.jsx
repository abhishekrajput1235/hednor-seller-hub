import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Save, Eye, ArrowLeft, Upload, X, Plus, Trash2, GripVertical,
    Image, FileText, Package, Truck, Search as SearchIcon, Settings, Star, Palette, Tag
} from 'lucide-react';
import { generateEnhancedProducts, generateProductCategories, generateProductAttributes } from '../../utils/productMockData';
import { categoryHierarchy, sizeOptions, countries } from '../../utils/categoryData';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);
    
    const [activeTab, setActiveTab] = useState('basic');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [errors, setErrors] = useState({});

    // Form state
    const [formData, setFormData] = useState({
        // Basic Info
        name: '',
        slug: '',
        sku: '',
        brand: '',
        categoryId: '',
        subcategoryId: '',
        tags: [],
        
        // Pricing
        price: '',
        comparePrice: '',
        costPrice: '',
        taxable: true,
        taxClass: 'standard',
        
        // Description
        shortDescription: '',
        description: '',
        specifications: [],
        
        // Images
        images: [],
        videoUrl: '',
        
        // Inventory
        hasVariants: false,
        stock: '',
        lowStockThreshold: 10,
        allowBackorders: false,
        attributes: [],
        variants: [],
        
        // Product Attributes
        productAttributes: {
            material: '',
            weight: '',
            weightUnit: 'kg',
            dimensions: { length: '', width: '', height: '' },
            dimensionUnit: 'cm',
            countryOfOrigin: '',
        },
        
        // Shipping
        weight: '',
        weightUnit: 'kg',
        dimensions: { length: '', width: '', height: '' },
        dimensionUnit: 'cm',
        shippingClass: 'standard',
        freeShipping: false,
        localPickup: false,
        estimatedDelivery: '3-5 business days',
        
        // SEO
        metaTitle: '',
        metaDescription: '',
        focusKeyword: '',
        
        // Settings
        status: 'draft',
        visibility: 'public',
        featured: false,
        reviewsEnabled: true,
        purchaseLimit: '',
        returnable: true,
        returnPeriod: 30,
    });

    // Load product data if editing
    useEffect(() => {
        if (isEditing && id) {
            const products = generateEnhancedProducts();
            const product = products.find(p => p.id === parseInt(id));
            if (product) {
                setFormData({
                    name: product.name || '',
                    slug: product.slug || '',
                    sku: product.sku || '',
                    brand: product.brand || '',
                    categoryId: product.categoryId || '',
                    tags: product.tags || [],
                    price: product.price?.toString() || '',
                    comparePrice: product.comparePrice?.toString() || '',
                    costPrice: product.costPrice?.toString() || '',
                    taxable: product.taxable !== false,
                    taxClass: product.taxClass || 'standard',
                    shortDescription: product.shortDescription || '',
                    description: product.description || '',
                    specifications: product.specifications || [],
                    images: product.images || [],
                    videoUrl: product.videoUrl || '',
                    hasVariants: product.hasVariants || false,
                    stock: product.stock?.toString() || '',
                    lowStockThreshold: product.lowStockThreshold || 10,
                    allowBackorders: product.allowBackorders || false,
                    attributes: product.attributes || [],
                    variants: product.variants || [],
                    weight: product.weight?.toString() || '',
                    weightUnit: product.weightUnit || 'kg',
                    dimensions: product.dimensions || { length: '', width: '', height: '' },
                    dimensionUnit: product.dimensionUnit || 'cm',
                    shippingClass: product.shippingClass || 'standard',
                    freeShipping: product.freeShipping || false,
                    localPickup: product.localPickup || false,
                    estimatedDelivery: product.estimatedDelivery || '3-5 business days',
                    metaTitle: product.seo?.metaTitle || '',
                    metaDescription: product.seo?.metaDescription || '',
                    focusKeyword: product.seo?.focusKeyword || '',
                    status: product.status || 'draft',
                    visibility: product.visibility || 'public',
                    featured: product.featured || false,
                    reviewsEnabled: product.reviewsEnabled !== false,
                    purchaseLimit: product.purchaseLimit?.toString() || '',
                    returnable: product.returnable !== false,
                    returnPeriod: product.returnPeriod || 30,
                });
            }
        }
    }, [isEditing, id]);

    // Generate slug from name
    const generateSlug = (name) => {
        return name.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    // Handle form field changes
    const handleChange = (field, value) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };
            // Auto-generate slug from name
            if (field === 'name' && !prev.slug) {
                updated.slug = generateSlug(value);
            }
            return updated;
        });
        // Clear error for this field
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        // Basic validation
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
        
        // Category validation
        if (!formData.categoryId) newErrors.categoryId = 'Category is required';
        
        // Price validation
        if (!formData.price || parseFloat(formData.price) < 0) {
            newErrors.price = 'Valid price is required (must be >= 0)';
        }
        
        // Stock validation (only if no variants)
        if (!formData.hasVariants && (!formData.stock || parseInt(formData.stock) < 0)) {
            newErrors.stock = 'Stock quantity is required';
        }
        
        // Variant validation
        if (formData.hasVariants) {
            if (formData.variants.length === 0) {
                newErrors.variants = 'At least one variant is required when variants are enabled';
            } else {
                const variantErrors = [];
                const seenCombinations = new Set();
                
                formData.variants.forEach((variant, index) => {
                    const errors = [];
                    
                    // Price validation
                    if (!variant.price || parseFloat(variant.price) < 0) {
                        errors.push('price');
                    }
                    
                    // Discount price validation
                    if (variant.discountedPrice && parseFloat(variant.discountedPrice) >= parseFloat(variant.price)) {
                        errors.push('discountedPrice');
                    }
                    
                    // Stock validation
                    if (variant.stock === '' || parseInt(variant.stock) < 0 || !Number.isInteger(parseFloat(variant.stock))) {
                        errors.push('stock');
                    }
                    
                    // Duplicate combination check
                    if (variant.color.name && variant.size) {
                        const combo = `${variant.color.name.toLowerCase()}-${variant.size.toLowerCase()}`;
                        if (seenCombinations.has(combo)) {
                            errors.push('duplicate');
                        } else {
                            seenCombinations.add(combo);
                        }
                    }
                    
                    if (errors.length > 0) {
                        variantErrors.push({ index, errors });
                    }
                });
                
                if (variantErrors.length > 0) {
                    newErrors.variantDetails = variantErrors;
                }
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle save
    const handleSave = async (status = formData.status) => {
        if (!validateForm()) {
            setActiveTab('basic');
            return;
        }

        setIsSaving(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLastSaved(new Date());
            console.log('Saving product:', { ...formData, status });
            
            if (status === 'pending') {
                alert('Product submitted for review!');
                navigate('/seller/products');
            }
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setIsSaving(false);
        }
    };

    // Add specification
    const addSpecification = () => {
        setFormData(prev => ({
            ...prev,
            specifications: [...prev.specifications, { name: '', value: '' }]
        }));
    };

    // Update specification
    const updateSpecification = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            specifications: prev.specifications.map((spec, i) => 
                i === index ? { ...spec, [field]: value } : spec
            )
        }));
    };

    // Remove specification
    const removeSpecification = (index) => {
        setFormData(prev => ({
            ...prev,
            specifications: prev.specifications.filter((_, i) => i !== index)
        }));
    };

    // Handle image upload (simulated)
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        // Simulate upload - in real app, upload to server
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, event.target.result]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    // Remove image
    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    // Set primary image
    const setPrimaryImage = (index) => {
        setFormData(prev => {
            const images = [...prev.images];
            const [primary] = images.splice(index, 1);
            return { ...prev, images: [primary, ...images] };
        });
    };

    // Get subcategories for selected category
    const getSubcategories = () => {
        if (!formData.categoryId) return [];
        // Filter categories where parentId matches the selected category
        return categories.filter(c => c.parentId === parseInt(formData.categoryId));
    };

    // Generate SKU for variant
    const generateVariantSku = (color, size, index) => {
        const base = formData.sku || 'PROD';
        const colorCode = color ? color.substring(0, 3).toUpperCase() : 'XXX';
        const sizeCode = size ? size.toUpperCase() : 'XX';
        return `${base}-${colorCode}-${sizeCode}-${String(index + 1).padStart(2, '0')}`;
    };

    // Check for duplicate variant (same color + size)
    const isDuplicateVariant = (color, size, excludeIndex = -1) => {
        return formData.variants.some((v, i) => 
            i !== excludeIndex && 
            v.color.name.toLowerCase() === color.toLowerCase() && 
            v.size.toLowerCase() === size.toLowerCase()
        );
    };

    // Add new variant
    const addVariant = () => {
        const newVariant = {
            id: Date.now(),
            color: { name: '', hex: '#000000' },
            size: '',
            sku: generateVariantSku('', '', formData.variants.length),
            price: formData.price || '',
            discountedPrice: '',
            stock: '',
            images: []
        };
        setFormData(prev => ({
            ...prev,
            variants: [...prev.variants, newVariant]
        }));
    };

    // Update variant
    const updateVariant = (index, field, value) => {
        setFormData(prev => {
            const updatedVariants = prev.variants.map((variant, i) => {
                if (i !== index) return variant;
                
                let updated = { ...variant };
                
                if (field === 'color') {
                    updated.color = typeof value === 'object' ? value : { ...variant.color, name: value };
                } else if (field === 'colorHex') {
                    updated.color = { ...variant.color, hex: value };
                } else {
                    updated[field] = value;
                }
                
                // Auto-update SKU when color or size changes
                if (field === 'color' || field === 'size') {
                    const colorName = field === 'color' 
                        ? (typeof value === 'object' ? value.name : value) 
                        : variant.color.name;
                    const sizeName = field === 'size' ? value : variant.size;
                    updated.sku = generateVariantSku(colorName, sizeName, i);
                }
                
                return updated;
            });
            return { ...prev, variants: updatedVariants };
        });
    };

    // Remove variant
    const removeVariant = (index) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }));
    };

    // Handle variant image upload
    const handleVariantImageUpload = (variantIndex, e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    variants: prev.variants.map((v, i) => 
                        i === variantIndex 
                            ? { ...v, images: [...v.images, event.target.result] }
                            : v
                    )
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    // Remove variant image
    const removeVariantImage = (variantIndex, imageIndex) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.map((v, i) => 
                i === variantIndex 
                    ? { ...v, images: v.images.filter((_, idx) => idx !== imageIndex) }
                    : v
            )
        }));
    };

    // Update product attributes
    const updateProductAttribute = (field, value) => {
        setFormData(prev => ({
            ...prev,
            productAttributes: {
                ...prev.productAttributes,
                [field]: value
            }
        }));
    };

    // Update product attribute dimensions
    const updateProductDimensions = (dimension, value) => {
        setFormData(prev => ({
            ...prev,
            productAttributes: {
                ...prev.productAttributes,
                dimensions: {
                    ...prev.productAttributes.dimensions,
                    [dimension]: value
                }
            }
        }));
    };

    // Categories for dropdown
    const categories = generateProductCategories();
    const attributes = generateProductAttributes();

    // Tab content
    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: FileText },
        { id: 'details', label: 'Details & Variants', icon: Tag },
        { id: 'images', label: 'Images & Media', icon: Image },
        { id: 'inventory', label: 'Inventory & Variants', icon: Package },
        { id: 'shipping', label: 'Shipping', icon: Truck },
        { id: 'seo', label: 'SEO & Marketing', icon: SearchIcon },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/seller/products')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-gray-500 dark:text-slate-400"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {isEditing ? 'Edit Product' : 'Add New Product'}
                        </h1>
                        {lastSaved && (
                            <p className="text-sm text-gray-500 dark:text-slate-400">
                                Last saved: {lastSaved.toLocaleTimeString()}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => navigate(`/seller/products/preview/${id || 'new'}`)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
                    >
                        <Eye className="w-5 h-5" />
                        <span>Preview</span>
                    </button>
                    <button
                        onClick={() => handleSave('draft')}
                        disabled={isSaving}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        <span>Save Draft</span>
                    </button>
                    <button
                        onClick={() => handleSave('pending')}
                        disabled={isSaving}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? (
                            <span>Saving...</span>
                        ) : (
                            <>
                                <span>{isEditing ? 'Update & Submit' : 'Submit for Review'}</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Error Summary */}
            {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg p-4">
                    <h3 className="text-red-800 dark:text-red-300 font-medium mb-2">Please fix the following errors:</h3>
                    <ul className="list-disc list-inside text-red-700 dark:text-red-400 text-sm">
                        {Object.values(errors).map((error, i) => (
                            <li key={i}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tabs */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                <div className="border-b border-gray-200 dark:border-slate-700">
                    <nav className="flex -mb-px overflow-x-auto">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-primary-600 text-primary-600'
                                            : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:border-gray-300 dark:hover:border-slate-600'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-6">
                    {/* Basic Info Tab */}
                    {activeTab === 'basic' && (
                        <div className="space-y-6">
                            {/* Product Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white ${
                                            errors.name ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-slate-700'
                                        }`}
                                        placeholder="Enter product name"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        Product Slug
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => handleChange('slug', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                        placeholder="auto-generated-from-name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        SKU <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.sku}
                                        onChange={(e) => handleChange('sku', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white ${
                                            errors.sku ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-slate-700'
                                        }`}
                                        placeholder="e.g., WH-001"
                                    />
                                    {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        Brand
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.brand}
                                        onChange={(e) => handleChange('brand', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                        placeholder="Enter brand name"
                                    />
                                </div>

                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.tags.join(', ')}
                                        onChange={(e) => handleChange('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                        placeholder="Enter tags separated by commas"
                                    />
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Pricing</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Regular Price <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-slate-400">$</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.price}
                                                onChange={(e) => handleChange('price', e.target.value)}
                                                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white ${
                                                    errors.price ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-slate-700'
                                                }`}
                                                placeholder="0.00"
                                            />
                                        </div>
                                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Sale Price
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-slate-400">$</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.comparePrice}
                                                onChange={(e) => handleChange('comparePrice', e.target.value)}
                                                className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        {formData.comparePrice && formData.price && parseFloat(formData.comparePrice) > 0 && (
                                            <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                                                {Math.round(((parseFloat(formData.comparePrice) - parseFloat(formData.price)) / parseFloat(formData.comparePrice)) * 100)}% discount
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Cost Price
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-slate-400">$</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.costPrice}
                                                onChange={(e) => handleChange('costPrice', e.target.value)}
                                                className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.taxable}
                                                onChange={(e) => handleChange('taxable', e.target.checked)}
                                                className="rounded border-gray-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 dark:bg-slate-900"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-slate-300">Taxable</span>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Tax Class
                                        </label>
                                        <select
                                            value={formData.taxClass}
                                            onChange={(e) => handleChange('taxClass', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                        >
                                            <option value="standard">Standard Rate</option>
                                            <option value="reduced">Reduced Rate</option>
                                            <option value="zero">Zero Rate</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Description</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Short Description
                                            <span className="text-gray-400 ml-2">({formData.shortDescription.length}/200)</span>
                                        </label>
                                        <textarea
                                            value={formData.shortDescription}
                                            onChange={(e) => handleChange('shortDescription', e.target.value.slice(0, 200))}
                                            rows={2}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                            placeholder="Brief product description..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Full Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => handleChange('description', e.target.value)}
                                            rows={6}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                            placeholder="Detailed product description (supports HTML)..."
                                        />
                                        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Supports basic HTML formatting</p>
                                    </div>
                                </div>
                            </div>

                            {/* Specifications */}
                            <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Product Specifications</h3>
                                    <button
                                        type="button"
                                        onClick={addSpecification}
                                        className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Add Specification</span>
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.specifications.map((spec, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <GripVertical className="w-5 h-5 text-gray-400 dark:text-slate-500 cursor-move" />
                                            <input
                                                type="text"
                                                value={spec.name}
                                                onChange={(e) => updateSpecification(index, 'name', e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                                placeholder="Specification name"
                                            />
                                            <input
                                                type="text"
                                                value={spec.value}
                                                onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                                placeholder="Specification value"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeSpecification(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    {formData.specifications.length === 0 && (
                                        <p className="text-gray-500 dark:text-slate-400 text-center py-4">No specifications added yet</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Details & Variants Tab */}
                    {activeTab === 'details' && (
                        <div className="space-y-8">
                            {/* Category & Subcategory Section */}
                            <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-primary-500" />
                                    Category Selection
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Parent Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.categoryId}
                                            onChange={(e) => {
                                                handleChange('categoryId', e.target.value);
                                                handleChange('subcategoryId', ''); // Reset subcategory
                                            }}
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white ${
                                                errors.categoryId ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-slate-700'
                                            }`}
                                        >
                                            <option value="">Select category</option>
                                            {categories.filter(cat => cat.parentId === null).map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Subcategory
                                        </label>
                                        <select
                                            value={formData.subcategoryId}
                                            onChange={(e) => handleChange('subcategoryId', e.target.value)}
                                            disabled={!formData.categoryId}
                                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <option value="">Select subcategory</option>
                                            {getSubcategories().map(sub => (
                                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Product Attributes Section */}
                            <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-primary-500" />
                                    Product Attributes
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Material
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.productAttributes.material}
                                            onChange={(e) => updateProductAttribute('material', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                                            placeholder="e.g., Cotton, Leather"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Brand
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.brand}
                                            onChange={(e) => handleChange('brand', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                                            placeholder="Brand name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Country of Origin
                                        </label>
                                        <select
                                            value={formData.productAttributes.countryOfOrigin}
                                            onChange={(e) => updateProductAttribute('countryOfOrigin', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                                        >
                                            <option value="">Select country</option>
                                            {countries.map(country => (
                                                <option key={country.code} value={country.name}>{country.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Weight
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.productAttributes.weight}
                                                onChange={(e) => updateProductAttribute('weight', e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                                                placeholder="0.00"
                                            />
                                            <select
                                                value={formData.productAttributes.weightUnit}
                                                onChange={(e) => updateProductAttribute('weightUnit', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                                            >
                                                <option value="kg">kg</option>
                                                <option value="g">g</option>
                                                <option value="lb">lb</option>
                                                <option value="oz">oz</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Dimensions (L × W × H)
                                        </label>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={formData.productAttributes.dimensions.length}
                                                    onChange={(e) => updateProductDimensions('length', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                                                    placeholder="Length"
                                                />
                                                <span className="text-gray-500 dark:text-slate-400 hidden sm:inline">×</span>
                                            </div>
                                            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={formData.productAttributes.dimensions.width}
                                                    onChange={(e) => updateProductDimensions('width', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                                                    placeholder="Width"
                                                />
                                                <span className="text-gray-500 dark:text-slate-400 hidden sm:inline">×</span>
                                            </div>
                                            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={formData.productAttributes.dimensions.height}
                                                    onChange={(e) => updateProductDimensions('height', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                                                    placeholder="Height"
                                                />
                                            </div>
                                            <select
                                                value={formData.productAttributes.dimensionUnit}
                                                onChange={(e) => updateProductAttribute('dimensionUnit', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white w-full sm:w-auto"
                                            >
                                                <option value="cm">cm</option>
                                                <option value="in">in</option>
                                                <option value="m">m</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Variant Toggle */}
                            <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-primary-200 dark:border-slate-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            <Palette className="w-5 h-5 text-primary-500" />
                                            Product Variants
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                                            Enable variants for products with multiple sizes, colors, or styles
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.hasVariants}
                                            onChange={(e) => handleChange('hasVariants', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-14 h-7 bg-gray-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 dark:after:border-slate-500 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-600"></div>
                                    </label>
                                </div>
                            </div>

                            {/* Variants Section */}
                            {formData.hasVariants && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Manage Variants ({formData.variants.length})
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={addVariant}
                                            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Variant
                                        </button>
                                    </div>

                                    {formData.variants.length === 0 ? (
                                        <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-8 text-center border-2 border-dashed border-gray-300 dark:border-slate-700">
                                            <Package className="w-12 h-12 text-gray-400 dark:text-slate-500 mx-auto mb-4" />
                                            <p className="text-gray-600 dark:text-slate-400 mb-4">No variants added yet</p>
                                            <button
                                                type="button"
                                                onClick={addVariant}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Add Your First Variant
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {formData.variants.map((variant, index) => {
                                                const duplicateError = variant.color.name && variant.size && isDuplicateVariant(variant.color.name, variant.size, index);
                                                return (
                                                    <div 
                                                        key={variant.id} 
                                                        className={`bg-white dark:bg-slate-800 rounded-xl p-6 border-2 transition-colors ${
                                                            duplicateError 
                                                                ? 'border-red-300 dark:border-red-700' 
                                                                : 'border-gray-200 dark:border-slate-700'
                                                        }`}
                                                    >
                                                        {duplicateError && (
                                                            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                                                <p className="text-red-600 dark:text-red-400 text-sm">
                                                                    ⚠️ Duplicate variant: This color + size combination already exists
                                                                </p>
                                                            </div>
                                                        )}
                                                        <div className="flex items-start justify-between mb-4">
                                                            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                                <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-sm">
                                                                    {index + 1}
                                                                </span>
                                                                Variant {index + 1}
                                                            </h4>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeVariant(index)}
                                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                                            {/* Color */}
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                                    Color
                                                                </label>
                                                                <div className="flex gap-2">
                                                                    <input
                                                                        type="color"
                                                                        value={variant.color.hex}
                                                                        onChange={(e) => updateVariant(index, 'colorHex', e.target.value)}
                                                                        className="w-10 h-10 border border-gray-300 dark:border-slate-700 rounded-lg cursor-pointer"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={variant.color.name}
                                                                        onChange={(e) => updateVariant(index, 'color', e.target.value)}
                                                                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                                                        placeholder="Color name"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Size */}
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                                    Size
                                                                </label>
                                                                <select
                                                                    value={variant.size}
                                                                    onChange={(e) => updateVariant(index, 'size', e.target.value)}
                                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                                                >
                                                                    <option value="">Select size</option>
                                                                    <optgroup label="Clothing Sizes">
                                                                        {sizeOptions.clothing.map(size => (
                                                                            <option key={size} value={size}>{size}</option>
                                                                        ))}
                                                                    </optgroup>
                                                                    <optgroup label="Shoe Sizes">
                                                                        {sizeOptions.shoes.map(size => (
                                                                            <option key={size} value={size}>{size}</option>
                                                                        ))}
                                                                    </optgroup>
                                                                    <optgroup label="Other">
                                                                        <option value="One Size">One Size</option>
                                                                        <option value="Custom">Custom</option>
                                                                    </optgroup>
                                                                </select>
                                                            </div>

                                                            {/* SKU */}
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                                    SKU
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={variant.sku}
                                                                    onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                                                    placeholder="Auto-generated"
                                                                />
                                                            </div>

                                                            {/* Price */}
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                                    Price <span className="text-red-500">*</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    min="0"
                                                                    value={variant.price}
                                                                    onChange={(e) => updateVariant(index, 'price', e.target.value)}
                                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                                                    placeholder="0.00"
                                                                />
                                                            </div>

                                                            {/* Discounted Price */}
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                                    Discounted Price
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    min="0"
                                                                    value={variant.discountedPrice}
                                                                    onChange={(e) => updateVariant(index, 'discountedPrice', e.target.value)}
                                                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white ${
                                                                        variant.discountedPrice && parseFloat(variant.discountedPrice) >= parseFloat(variant.price)
                                                                            ? 'border-red-300 dark:border-red-700'
                                                                            : 'border-gray-300 dark:border-slate-700'
                                                                    }`}
                                                                    placeholder="Optional"
                                                                />
                                                                {variant.discountedPrice && parseFloat(variant.discountedPrice) >= parseFloat(variant.price) && (
                                                                    <p className="text-red-500 text-xs mt-1">Must be less than price</p>
                                                                )}
                                                            </div>

                                                            {/* Stock */}
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                                    Stock <span className="text-red-500">*</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    step="1"
                                                                    value={variant.stock}
                                                                    onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                                                    placeholder="0"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Variant Images */}
                                                        <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
                                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                                                Variant Images
                                                            </label>
                                                            <div className="flex flex-wrap gap-3">
                                                                {variant.images.map((img, imgIndex) => (
                                                                    <div key={imgIndex} className="relative w-20 h-20">
                                                                        <img
                                                                            src={img}
                                                                            alt={`Variant ${index + 1} image ${imgIndex + 1}`}
                                                                            className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-slate-700"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeVariantImage(index, imgIndex)}
                                                                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                                                        >
                                                                            <X className="w-3 h-3" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                                <label className="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
                                                                    <input
                                                                        type="file"
                                                                        multiple
                                                                        accept="image/*"
                                                                        onChange={(e) => handleVariantImageUpload(index, e)}
                                                                        className="hidden"
                                                                    />
                                                                    <Plus className="w-6 h-6 text-gray-400 dark:text-slate-500" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Images Tab */}
                    {activeTab === 'images' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Product Images</h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
                                    Upload up to 10 images. Max 5MB each. JPG, PNG formats.
                                </p>

                                {/* Upload Zone */}
                                <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                                    <Upload className="w-12 h-12 text-gray-400 dark:text-slate-500 mx-auto mb-4" />
                                    <p className="text-gray-600 dark:text-slate-300 mb-2">Drag and drop images here, or click to browse</p>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer"
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        Browse Files
                                    </label>
                                </div>

                                {/* Image Preview Grid */}
                                {formData.images.length > 0 && (
                                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {formData.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`relative group aspect-square rounded-lg overflow-hidden border-2 ${
                                                    index === 0 ? 'border-primary-500' : 'border-gray-200 dark:border-slate-700'
                                                }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Product ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                {index === 0 && (
                                                    <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded flex items-center">
                                                        <Star className="w-3 h-3 mr-1" />
                                                        Primary
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                                    {index !== 0 && (
                                                        <button
                                                            onClick={() => setPrimaryImage(index)}
                                                            className="p-2 bg-white dark:bg-slate-700 rounded-full hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300"
                                                            title="Set as primary"
                                                        >
                                                            <Star className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="p-2 bg-white dark:bg-slate-700 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30"
                                                        title="Remove"
                                                    >
                                                        <X className="w-4 h-4 text-red-600" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Video */}
                            <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Product Video</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        Video URL (YouTube or Vimeo)
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.videoUrl}
                                        onChange={(e) => handleChange('videoUrl', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                        placeholder="https://youtube.com/watch?v=..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Inventory Tab */}
                    {activeTab === 'inventory' && (
                        <div className="space-y-6">
                            {/* Variants Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700">
                                <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white">Enable Product Variants</h3>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Create variations like size, color, etc.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.hasVariants}
                                        onChange={(e) => handleChange('hasVariants', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-slate-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                </label>
                            </div>

                            {/* Simple Product Inventory */}
                            {!formData.hasVariants && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Stock Quantity <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) => handleChange('stock', e.target.value)}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white ${
                                                errors.stock ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-slate-700'
                                            }`}
                                            placeholder="0"
                                        />
                                        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Low Stock Threshold
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.lowStockThreshold}
                                            onChange={(e) => handleChange('lowStockThreshold', parseInt(e.target.value) || 10)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                            placeholder="10"
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.allowBackorders}
                                                onChange={(e) => handleChange('allowBackorders', e.target.checked)}
                                                className="rounded border-gray-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 dark:bg-slate-900"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-slate-300">Allow Backorders</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Variable Product */}
                            {formData.hasVariants && (
                                <div className="space-y-6">
                                    {/* Attributes Section */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-medium text-gray-900 dark:text-white">Attributes</h4>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        attributes: [...prev.attributes, { name: '', values: [] }]
                                                    }));
                                                }}
                                                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                                            >
                                                <Plus className="w-4 h-4" />
                                                <span>Add Attribute</span>
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {formData.attributes.map((attr, index) => (
                                                <div key={index} className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <select
                                                            value={attr.name}
                                                            onChange={(e) => {
                                                                const updated = [...formData.attributes];
                                                                updated[index].name = e.target.value;
                                                                handleChange('attributes', updated);
                                                            }}
                                                            className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                                                        >
                                                            <option value="">Select attribute</option>
                                                            {attributes.map(a => (
                                                                <option key={a.id} value={a.name}>{a.name}</option>
                                                            ))}
                                                        </select>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const updated = formData.attributes.filter((_, i) => i !== index);
                                                                handleChange('attributes', updated);
                                                            }}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={attr.values.join(', ')}
                                                        onChange={(e) => {
                                                            const updated = [...formData.attributes];
                                                            updated[index].values = e.target.value.split(',').map(v => v.trim()).filter(Boolean);
                                                            handleChange('attributes', updated);
                                                        }}
                                                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                                                        placeholder="Enter values separated by commas (e.g., Small, Medium, Large)"
                                                    />
                                                </div>
                                            ))}
                                            {formData.attributes.length === 0 && (
                                                <p className="text-gray-500 dark:text-slate-400 text-center py-4">No attributes added yet</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Variations would go here - simplified for this example */}
                                    {formData.attributes.length > 0 && (
                                        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
                                            <p className="text-gray-600 dark:text-slate-300">
                                                Variations will be generated based on your attribute combinations.
                                                After saving, you can edit individual variation prices and stock levels.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Shipping Tab */}
                    {activeTab === 'shipping' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Weight */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        Weight
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={formData.weight}
                                            onChange={(e) => handleChange('weight', e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                            placeholder="0.00"
                                        />
                                        <select
                                            value={formData.weightUnit}
                                            onChange={(e) => handleChange('weightUnit', e.target.value)}
                                            className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                        >
                                            <option value="kg">kg</option>
                                            <option value="lb">lb</option>
                                            <option value="g">g</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Shipping Class */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        Shipping Class
                                    </label>
                                    <select
                                        value={formData.shippingClass}
                                        onChange={(e) => handleChange('shippingClass', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                    >
                                        <option value="standard">Standard Shipping</option>
                                        <option value="express">Express Shipping</option>
                                        <option value="free">Free Shipping</option>
                                        <option value="heavy">Heavy Items</option>
                                    </select>
                                </div>
                            </div>

                            {/* Dimensions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                    Dimensions (L × W × H)
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.dimensions.length}
                                        onChange={(e) => handleChange('dimensions', { ...formData.dimensions, length: e.target.value })}
                                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                        placeholder="Length"
                                    />
                                    <span className="text-gray-500 dark:text-slate-400">×</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.dimensions.width}
                                        onChange={(e) => handleChange('dimensions', { ...formData.dimensions, width: e.target.value })}
                                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                        placeholder="Width"
                                    />
                                    <span className="text-gray-500 dark:text-slate-400">×</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.dimensions.height}
                                        onChange={(e) => handleChange('dimensions', { ...formData.dimensions, height: e.target.value })}
                                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                        placeholder="Height"
                                    />
                                    <select
                                        value={formData.dimensionUnit}
                                        onChange={(e) => handleChange('dimensionUnit', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                    >
                                        <option value="cm">cm</option>
                                        <option value="inch">inch</option>
                                        <option value="m">m</option>
                                    </select>
                                </div>
                            </div>

                            {/* Shipping Options */}
                            <div className="space-y-4">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.freeShipping}
                                        onChange={(e) => handleChange('freeShipping', e.target.checked)}
                                        className="rounded border-gray-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 dark:bg-slate-900"
                                    />
                                    <span className="text-gray-700 dark:text-slate-300">Free Shipping</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.localPickup}
                                        onChange={(e) => handleChange('localPickup', e.target.checked)}
                                        className="rounded border-gray-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 dark:bg-slate-900"
                                    />
                                    <span className="text-gray-700 dark:text-slate-300">Local Pickup Available</span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                    Estimated Delivery Time
                                </label>
                                <input
                                    type="text"
                                    value={formData.estimatedDelivery}
                                    onChange={(e) => handleChange('estimatedDelivery', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                    placeholder="e.g., 3-5 business days"
                                />
                            </div>
                        </div>
                    )}

                    {/* SEO Tab */}
                    {activeTab === 'seo' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">SEO Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Meta Title
                                            <span className="text-gray-400 ml-2">({formData.metaTitle.length}/60)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.metaTitle}
                                            onChange={(e) => handleChange('metaTitle', e.target.value.slice(0, 60))}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                            placeholder="Enter meta title for search engines"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Meta Description
                                            <span className="text-gray-400 ml-2">({formData.metaDescription.length}/160)</span>
                                        </label>
                                        <textarea
                                            value={formData.metaDescription}
                                            onChange={(e) => handleChange('metaDescription', e.target.value.slice(0, 160))}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                            placeholder="Enter meta description for search engines"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Focus Keyword
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.focusKeyword}
                                            onChange={(e) => handleChange('focusKeyword', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                            placeholder="Main keyword for this product"
                                        />
                                    </div>
                                </div>

                                {/* Search Preview */}
                                <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Search Preview</h4>
                                    <div className="bg-white dark:bg-slate-800 p-4 rounded border border-gray-200 dark:border-slate-700">
                                        <p className="text-blue-600 dark:text-blue-400 text-lg hover:underline cursor-pointer">
                                            {formData.metaTitle || formData.name || 'Product Title'}
                                        </p>
                                        <p className="text-green-700 dark:text-green-500 text-sm">
                                            yourstore.com/products/{formData.slug || 'product-slug'}
                                        </p>
                                        <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">
                                            {formData.metaDescription || formData.shortDescription || 'Product description will appear here...'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Marketing */}
                            <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Marketing</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.featured}
                                            onChange={(e) => handleChange('featured', e.target.checked)}
                                            className="rounded border-gray-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 dark:bg-slate-900"
                                        />
                                        <span className="text-gray-700 dark:text-slate-300">Featured Product</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            {/* Status */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Product Status</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Status
                                        </label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => handleChange('status', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="pending">Pending Review</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                            Visibility
                                        </label>
                                        <select
                                            value={formData.visibility}
                                            onChange={(e) => handleChange('visibility', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                        >
                                            <option value="public">Public</option>
                                            <option value="hidden">Hidden</option>
                                            <option value="password">Password Protected</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Product Settings */}
                            <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Product Settings</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.reviewsEnabled}
                                            onChange={(e) => handleChange('reviewsEnabled', e.target.checked)}
                                            className="rounded border-gray-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 dark:bg-slate-900"
                                        />
                                        <span className="text-gray-700 dark:text-slate-300">Enable Reviews</span>
                                    </label>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                Purchase Limit (per order)
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.purchaseLimit}
                                                onChange={(e) => handleChange('purchaseLimit', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                                placeholder="Leave empty for unlimited"
                                            />
                                        </div>
                                    </div>

                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.returnable}
                                            onChange={(e) => handleChange('returnable', e.target.checked)}
                                            className="rounded border-gray-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 dark:bg-slate-900"
                                        />
                                        <span className="text-gray-700 dark:text-slate-300">Returnable</span>
                                    </label>

                                    {formData.returnable && (
                                        <div className="ml-8">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                Return Period (days)
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.returnPeriod}
                                                onChange={(e) => handleChange('returnPeriod', parseInt(e.target.value) || 30)}
                                                className="w-full max-w-xs px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-white"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
