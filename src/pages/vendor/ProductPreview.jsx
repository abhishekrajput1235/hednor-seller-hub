import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    ArrowLeft, Edit, Star, ShoppingCart, Heart, Share2, 
    ChevronLeft, ChevronRight, Package, Truck, Shield, RefreshCw,
    Monitor, Tablet, Smartphone, ZoomIn
} from 'lucide-react';
import { generateEnhancedProducts } from '../../utils/productMockData';
import StatusBadge from '../../components/common/StatusBadge';

const ProductPreview = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [viewportSize, setViewportSize] = useState('desktop');
    const [showZoom, setShowZoom] = useState(false);

    // Get product data
    const product = useMemo(() => {
        if (!id || id === 'new') return null;
        return generateEnhancedProducts().find(p => p.id === parseInt(id));
    }, [id]);

    if (!product) {
        return (
            <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Product not found</h3>
                <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
                <button
                    onClick={() => navigate('/seller/products')}
                    className="text-primary-600 hover:text-primary-700"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    const discountPercentage = product.comparePrice 
        ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
        : null;

    const viewportClasses = {
        desktop: 'max-w-full',
        tablet: 'max-w-2xl mx-auto',
        mobile: 'max-w-sm mx-auto',
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/seller/products')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Product Preview</h1>
                        <p className="text-gray-500">Preview how your product will appear to customers</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {/* Viewport Switcher */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setViewportSize('desktop')}
                            className={`p-2 ${viewportSize === 'desktop' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                            title="Desktop view"
                        >
                            <Monitor className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewportSize('tablet')}
                            className={`p-2 ${viewportSize === 'tablet' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                            title="Tablet view"
                        >
                            <Tablet className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewportSize('mobile')}
                            className={`p-2 ${viewportSize === 'mobile' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                            title="Mobile view"
                        >
                            <Smartphone className="w-5 h-5" />
                        </button>
                    </div>
                    <button
                        onClick={() => navigate(`/seller/products/edit/${product.id}`)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <Edit className="w-5 h-5" />
                        <span>Edit Product</span>
                    </button>
                </div>
            </div>

            {/* Preview Status Banner */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <StatusBadge status={product.status} />
                    <span className="text-yellow-800">
                        This is a preview. The product is currently {product.status}.
                    </span>
                </div>
            </div>

            {/* Product Preview */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all ${viewportClasses[viewportSize]}`}>
                <div className={`p-6 ${viewportSize === 'mobile' ? 'space-y-6' : 'grid grid-cols-2 gap-8'}`}>
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div 
                            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
                            onClick={() => setShowZoom(true)}
                        >
                            <img
                                src={product.images?.[selectedImage] || 'https://via.placeholder.com/600'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {discountPercentage && (
                                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                                    -{discountPercentage}%
                                </span>
                            )}
                            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100">
                                <ZoomIn className="w-5 h-5 text-gray-600" />
                            </button>
                            {/* Navigation */}
                            {product.images?.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedImage(i => Math.max(0, i - 1)); }}
                                        disabled={selectedImage === 0}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white disabled:opacity-50"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedImage(i => Math.min(product.images.length - 1, i + 1)); }}
                                        disabled={selectedImage === product.images.length - 1}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white disabled:opacity-50"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {product.images?.length > 1 && (
                            <div className="flex space-x-2 overflow-x-auto">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                            selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                                        }`}
                                    >
                                        <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Category & Brand */}
                        <div className="flex items-center space-x-2 text-sm">
                            <span className="text-gray-500">{product.category}</span>
                            {product.brand && (
                                <>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-gray-500">{product.brand}</span>
                                </>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className={`font-bold text-gray-900 ${viewportSize === 'mobile' ? 'text-xl' : 'text-2xl'}`}>
                            {product.name}
                        </h1>

                        {/* Rating */}
                        {product.reviews?.count > 0 && (
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < Math.floor(product.reviews.average)
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {product.reviews.average} ({product.reviews.count} reviews)
                                </span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-baseline space-x-3">
                            <span className={`font-bold text-gray-900 ${viewportSize === 'mobile' ? 'text-2xl' : 'text-3xl'}`}>
                                ${product.price.toFixed(2)}
                            </span>
                            {product.comparePrice && (
                                <span className="text-lg text-gray-500 line-through">
                                    ${product.comparePrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Short Description */}
                        {product.shortDescription && (
                            <p className="text-gray-600">{product.shortDescription}</p>
                        )}

                        {/* Variants */}
                        {product.hasVariants && product.attributes?.length > 0 && (
                            <div className="space-y-4">
                                {product.attributes.map((attr, index) => (
                                    <div key={index}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {attr.name}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {attr.values.map((value) => (
                                                <button
                                                    key={value}
                                                    onClick={() => setSelectedVariant(prev => ({ ...prev, [attr.name]: value }))}
                                                    className={`px-4 py-2 rounded-lg border ${
                                                        selectedVariant[attr.name] === value
                                                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                >
                                                    {value}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Stock Status */}
                        <div className="flex items-center space-x-2">
                            {product.stock > 0 ? (
                                <>
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                    <span className="text-green-600 font-medium">In Stock</span>
                                    <span className="text-gray-500">({product.stock} available)</span>
                                </>
                            ) : (
                                <>
                                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                    <span className="text-red-600 font-medium">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-3 py-2 hover:bg-gray-50"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 border-x border-gray-200">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="px-3 py-2 hover:bg-gray-50"
                                >
                                    +
                                </button>
                            </div>
                            <button 
                                disabled
                                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg opacity-50 cursor-not-allowed"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span>Add to Cart</span>
                            </button>
                            <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <Heart className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <Share2 className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                            <div className="flex items-center space-x-3">
                                <Truck className="w-5 h-5 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    {product.freeShipping ? 'Free Shipping' : product.estimatedDelivery || 'Standard Delivery'}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Shield className="w-5 h-5 text-gray-400" />
                                <span className="text-sm text-gray-600">Secure Payment</span>
                            </div>
                            {product.returnable && (
                                <div className="flex items-center space-x-3">
                                    <RefreshCw className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm text-gray-600">{product.returnPeriod || 30}-day Returns</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description & Specifications */}
                <div className="border-t border-gray-200 p-6">
                    <div className="space-y-6">
                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                            <div 
                                className="text-gray-600 prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: product.description || product.shortDescription || 'No description available.' }}
                            />
                        </div>

                        {/* Specifications */}
                        {product.specifications?.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <tbody className="divide-y divide-gray-200">
                                            {product.specifications.map((spec, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">
                                                        {spec.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">
                                                        {spec.value}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Zoom Modal */}
            {showZoom && (
                <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowZoom(false)}
                >
                    <button 
                        className="absolute top-4 right-4 text-white hover:text-gray-300"
                        onClick={() => setShowZoom(false)}
                    >
                        <span className="text-2xl">×</span>
                    </button>
                    <img
                        src={product.images?.[selectedImage] || 'https://via.placeholder.com/800'}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductPreview;
