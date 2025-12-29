import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Building2,
    ShieldCheck,
    Star,
    Camera,
    Edit3,
    Save,
    Award,
    TrendingUp,
    Package,
    DollarSign,
    FileText,
    CreditCard,
    Bell,
    Settings,
    Upload,
    CheckCircle,
    AlertCircle,
    Globe,
    Calendar
} from 'lucide-react';

interface ProfileData {
    personalInfo: {
        name: string;
        email: string;
        phone: string;
        avatar: string;
    };
    businessInfo: {
        storeName: string;
        businessName: string;
        gstin: string;
        pan: string;
        businessType: string;
        registrationNumber: string;
        website: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    bankDetails: {
        accountHolder: string;
        accountNumber: string;
        ifscCode: string;
        bankName: string;
    };
    verification: {
        emailVerified: boolean;
        phoneVerified: boolean;
        gstVerified: boolean;
        bankVerified: boolean;
    };
    performance: {
        rating: number;
        totalOrders: number;
        totalRevenue: number;
        activeProducts: number;
    };
}

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'business' | 'payment' | 'documents' | 'settings'>('overview');

    const [profileData, setProfileData] = useState<ProfileData>({
        personalInfo: {
            name: 'Rajesh Kumar',
            email: 'rajesh.kumar@sellerhub.com',
            phone: '+91 98765 43210',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh'
        },
        businessInfo: {
            storeName: 'TechGear Electronics',
            businessName: 'TechGear Private Limited',
            gstin: '07AABCT1234D1Z5',
            pan: 'AABCT1234D',
            businessType: 'Private Limited',
            registrationNumber: 'U74999DL2020PTC375634',
            website: 'www.techgearelectronics.com'
        },
        address: {
            street: '123 Industrial Area, Sector 18',
            city: 'New Delhi',
            state: 'Delhi',
            zipCode: '110001',
            country: 'India'
        },
        bankDetails: {
            accountHolder: 'TechGear Private Limited',
            accountNumber: '1234567890',
            ifscCode: 'HDFC0001234',
            bankName: 'HDFC Bank'
        },
        verification: {
            emailVerified: true,
            phoneVerified: true,
            gstVerified: true,
            bankVerified: false
        },
        performance: {
            rating: 4.7,
            totalOrders: 1543,
            totalRevenue: 2847651,
            activeProducts: 234
        }
    });

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'business', label: 'Business Info', icon: Building2 },
        { id: 'payment', label: 'Payment Details', icon: CreditCard },
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    const VerificationBadge = ({ verified, label }: { verified: boolean; label: string }) => (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${verified
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            }`}>
            {verified ? (
                <CheckCircle className="h-4 w-4" />
            ) : (
                <AlertCircle className="h-4 w-4" />
            )}
            <span className="font-medium">{label}</span>
        </div>
    );

    const StatCard = ({ icon: Icon, label, value, trend, color }: {
        icon: React.ElementType;
        label: string;
        value: string | number;
        trend?: number;
        color: string;
    }) => (
        <div className="bg-white rounded-xl p-6 border border-[rgb(var(--c-neutral-200))] hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                        <TrendingUp className="h-4 w-4" />
                        <span>{trend}%</span>
                    </div>
                )}
            </div>
            <p className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-1">{value}</p>
            <p className="text-sm text-[rgb(var(--c-neutral-500))]">{label}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[rgb(var(--c-neutral-100))]">
            {/* Header with Cover Photo */}
            <div className="relative bg-gradient-to-r from-[rgb(var(--c-primary-500))] to-[rgb(var(--c-secondary-500))] h-48">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    <span className="text-sm font-medium">Change Cover</span>
                </button>
            </div>

            {/* Profile Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <img
                                src={profileData.personalInfo.avatar}
                                alt={profileData.personalInfo.name}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                            />
                            <button className="absolute bottom-0 right-0 bg-[rgb(var(--c-primary-500))] text-white p-2 rounded-full hover:scale-110 transition-transform shadow-lg">
                                <Camera className="h-4 w-4" />
                            </button>
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                                <CheckCircle className="h-5 w-5" />
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h1 className="text-3xl font-bold text-[rgb(var(--c-neutral-900))] mb-1">
                                        {profileData.personalInfo.name}
                                    </h1>
                                    <p className="text-lg text-[rgb(var(--c-neutral-600))] font-medium">
                                        {profileData.businessInfo.storeName}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="btn-primary flex items-center gap-2"
                                >
                                    {isEditing ? (
                                        <>
                                            <Save className="h-4 w-4" />
                                            Save Changes
                                        </>
                                    ) : (
                                        <>
                                            <Edit3 className="h-4 w-4" />
                                            Edit Profile
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Rating & Verification Badges */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <div className="flex items-center gap-1 bg-[rgb(var(--c-primary-500))] text-white px-3 py-1.5 rounded-lg">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="font-bold">{profileData.performance.rating}</span>
                                    <span className="text-sm opacity-90">Rating</span>
                                </div>
                                <VerificationBadge verified={profileData.verification.emailVerified} label="Email Verified" />
                                <VerificationBadge verified={profileData.verification.phoneVerified} label="Phone Verified" />
                                <VerificationBadge verified={profileData.verification.gstVerified} label="GST Verified" />
                                <div className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg">
                                    <Award className="h-4 w-4" />
                                    <span className="font-medium text-sm">Premium Seller</span>
                                </div>
                            </div>

                            {/* Quick Contact Info */}
                            <div className="flex flex-wrap gap-4 text-sm text-[rgb(var(--c-neutral-600))]">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span>{profileData.personalInfo.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <span>{profileData.personalInfo.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{profileData.address.city}, {profileData.address.state}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard
                        icon={Star}
                        label="Average Rating"
                        value={profileData.performance.rating}
                        trend={5.2}
                        color="from-yellow-500 to-orange-500"
                    />
                    <StatCard
                        icon={Package}
                        label="Total Orders"
                        value={profileData.performance.totalOrders.toLocaleString()}
                        trend={12.5}
                        color="from-blue-500 to-cyan-500"
                    />
                    <StatCard
                        icon={DollarSign}
                        label="Total Revenue"
                        value={`₹${(profileData.performance.totalRevenue / 100000).toFixed(1)}L`}
                        trend={8.3}
                        color="from-green-500 to-emerald-500"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Active Products"
                        value={profileData.performance.activeProducts}
                        color="from-purple-500 to-pink-500"
                    />
                </div>

                {/* Tabs Navigation */}
                <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
                    <div className="border-b border-[rgb(var(--c-neutral-200))]">
                        <div className="flex overflow-x-auto">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${activeTab === tab.id
                                            ? 'text-[rgb(var(--c-primary-500))] border-b-2 border-[rgb(var(--c-primary-500))]'
                                            : 'text-[rgb(var(--c-neutral-600))] hover:text-[rgb(var(--c-neutral-900))]'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Personal Information */}
                                    <div>
                                        <h3 className="text-lg font-bold text-[rgb(var(--c-neutral-900))] mb-4 flex items-center gap-2">
                                            <User className="h-5 w-5 text-[rgb(var(--c-primary-500))]" />
                                            Personal Information
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={profileData.personalInfo.name}
                                                    disabled={!isEditing}
                                                    className="input-field"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={profileData.personalInfo.email}
                                                    disabled={!isEditing}
                                                    className="input-field"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    value={profileData.personalInfo.phone}
                                                    disabled={!isEditing}
                                                    className="input-field"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Information */}
                                    <div>
                                        <h3 className="text-lg font-bold text-[rgb(var(--c-neutral-900))] mb-4 flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-[rgb(var(--c-primary-500))]" />
                                            Business Address
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">Street Address</label>
                                                <input
                                                    type="text"
                                                    value={profileData.address.street}
                                                    disabled={!isEditing}
                                                    className="input-field"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">City</label>
                                                    <input
                                                        type="text"
                                                        value={profileData.address.city}
                                                        disabled={!isEditing}
                                                        className="input-field"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">State</label>
                                                    <input
                                                        type="text"
                                                        value={profileData.address.state}
                                                        disabled={!isEditing}
                                                        className="input-field"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">ZIP Code</label>
                                                    <input
                                                        type="text"
                                                        value={profileData.address.zipCode}
                                                        disabled={!isEditing}
                                                        className="input-field"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">Country</label>
                                                    <input
                                                        type="text"
                                                        value={profileData.address.country}
                                                        disabled={!isEditing}
                                                        className="input-field"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Business Info Tab */}
                        {activeTab === 'business' && (
                            <div className="space-y-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <ShieldCheck className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">Business Verification</h4>
                                            <p className="text-sm text-blue-700">Complete your business verification to unlock premium features and build trust with customers.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">Store Name</label>
                                        <input
                                            type="text"
                                            value={profileData.businessInfo.storeName}
                                            disabled={!isEditing}
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">Business Name</label>
                                        <input
                                            type="text"
                                            value={profileData.businessInfo.businessName}
                                            disabled={!isEditing}
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">GSTIN</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={profileData.businessInfo.gstin}
                                                disabled={!isEditing}
                                                className="input-field pr-10"
                                            />
                                            {profileData.verification.gstVerified && (
                                                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-600" />
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">PAN Number</label>
                                        <input
                                            type="text"
                                            value={profileData.businessInfo.pan}
                                            disabled={!isEditing}
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">Business Type</label>
                                        <select
                                            value={profileData.businessInfo.businessType}
                                            disabled={!isEditing}
                                            className="input-field"
                                        >
                                            <option>Private Limited</option>
                                            <option>Partnership</option>
                                            <option>Sole Proprietorship</option>
                                            <option>LLP</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">Registration Number</label>
                                        <input
                                            type="text"
                                            value={profileData.businessInfo.registrationNumber}
                                            disabled={!isEditing}
                                            className="input-field"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block flex items-center gap-2">
                                            <Globe className="h-4 w-4" />
                                            Website URL
                                        </label>
                                        <input
                                            type="url"
                                            value={profileData.businessInfo.website}
                                            disabled={!isEditing}
                                            className="input-field"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payment Details Tab */}
                        {activeTab === 'payment' && (
                            <div className="space-y-6">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-yellow-900 mb-1">Bank Verification Pending</h4>
                                            <p className="text-sm text-yellow-700">Please verify your bank account to receive payments. We'll send a small test amount for verification.</p>
                                            <button className="mt-2 text-sm font-semibold text-yellow-800 hover:text-yellow-900 underline">
                                                Verify Now →
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">Account Holder Name</label>
                                        <input
                                            type="text"
                                            value={profileData.bankDetails.accountHolder}
                                            disabled={!isEditing}
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">Account Number</label>
                                        <input
                                            type="text"
                                            value={profileData.bankDetails.accountNumber}
                                            disabled={!isEditing}
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">IFSC Code</label>
                                        <input
                                            type="text"
                                            value={profileData.bankDetails.ifscCode}
                                            disabled={!isEditing}
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-[rgb(var(--c-neutral-500))] mb-1 block">Bank Name</label>
                                        <input
                                            type="text"
                                            value={profileData.bankDetails.bankName}
                                            disabled={!isEditing}
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                <div className="border-t border-[rgb(var(--c-neutral-200))] pt-6 mt-6">
                                    <h3 className="text-lg font-bold text-[rgb(var(--c-neutral-900))] mb-4">Payment Methods</h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="border border-[rgb(var(--c-neutral-200))] rounded-lg p-4 hover:border-[rgb(var(--c-primary-500))] cursor-pointer transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <CreditCard className="h-6 w-6 text-[rgb(var(--c-primary-500))]" />
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active</span>
                                            </div>
                                            <p className="font-semibold text-[rgb(var(--c-neutral-900))]">Bank Transfer</p>
                                            <p className="text-sm text-[rgb(var(--c-neutral-500))]">NEFT/RTGS</p>
                                        </div>
                                        <div className="border border-[rgb(var(--c-neutral-200))] rounded-lg p-4 hover:border-[rgb(var(--c-primary-500))] cursor-pointer transition-colors opacity-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <DollarSign className="h-6 w-6 text-[rgb(var(--c-neutral-500))]" />
                                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">Inactive</span>
                                            </div>
                                            <p className="font-semibold text-[rgb(var(--c-neutral-900))]">UPI</p>
                                            <p className="text-sm text-[rgb(var(--c-neutral-500))]">Setup Required</p>
                                        </div>
                                        <div className="border border-[rgb(var(--c-neutral-200))] rounded-lg p-4 hover:border-[rgb(var(--c-primary-500))] cursor-pointer transition-colors opacity-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <Building2 className="h-6 w-6 text-[rgb(var(--c-neutral-500))]" />
                                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">Inactive</span>
                                            </div>
                                            <p className="font-semibold text-[rgb(var(--c-neutral-900))]">Wallet</p>
                                            <p className="text-sm text-[rgb(var(--c-neutral-500))]">Setup Required</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Documents Tab */}
                        {activeTab === 'documents' && (
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { name: 'GST Certificate', status: 'verified', date: '2024-01-15' },
                                        { name: 'PAN Card', status: 'verified', date: '2024-01-15' },
                                        { name: 'Bank Statement', status: 'pending', date: '2024-12-20' },
                                        { name: 'Business Registration', status: 'verified', date: '2024-01-10' },
                                        { name: 'Address Proof', status: 'verified', date: '2024-01-12' },
                                        { name: 'ID Proof', status: 'verified', date: '2024-01-12' }
                                    ].map((doc, index) => (
                                        <div key={index} className="border border-[rgb(var(--c-neutral-200))] rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                                        <FileText className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-[rgb(var(--c-neutral-900))]">{doc.name}</h4>
                                                        <p className="text-xs text-[rgb(var(--c-neutral-500))] flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            Uploaded: {doc.date}
                                                        </p>
                                                    </div>
                                                </div>
                                                {doc.status === 'verified' ? (
                                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                                ) : (
                                                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="flex-1 text-sm py-2 border border-[rgb(var(--c-neutral-300))] rounded-lg hover:bg-[rgb(var(--c-neutral-100))] transition-colors">
                                                    View
                                                </button>
                                                <button className="flex-1 text-sm py-2 bg-[rgb(var(--c-primary-500))] text-[rgb(var(--c-neutral-900))] rounded-lg hover:shadow-md transition-shadow flex items-center justify-center gap-1">
                                                    <Upload className="h-3 w-3" />
                                                    Re-upload
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-2 border-dashed border-[rgb(var(--c-neutral-300))] rounded-lg p-8 text-center hover:border-[rgb(var(--c-primary-500))] transition-colors cursor-pointer">
                                    <Upload className="h-12 w-12 text-[rgb(var(--c-neutral-400))] mx-auto mb-3" />
                                    <h4 className="font-semibold text-[rgb(var(--c-neutral-900))] mb-1">Upload New Document</h4>
                                    <p className="text-sm text-[rgb(var(--c-neutral-500))] mb-3">Click to browse or drag and drop</p>
                                    <p className="text-xs text-[rgb(var(--c-neutral-400))]">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                                </div>
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-[rgb(var(--c-neutral-900))] mb-4 flex items-center gap-2">
                                        <Bell className="h-5 w-5 text-[rgb(var(--c-primary-500))]" />
                                        Notification Preferences
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Email Notifications', desc: 'Receive order updates via email' },
                                            { label: 'SMS Alerts', desc: 'Get important alerts via SMS' },
                                            { label: 'Push Notifications', desc: 'Browser push notifications' },
                                            { label: 'Marketing Emails', desc: 'Promotional offers and updates' }
                                        ].map((setting, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 bg-[rgb(var(--c-neutral-50))] rounded-lg">
                                                <div>
                                                    <p className="font-semibold text-[rgb(var(--c-neutral-900))]">{setting.label}</p>
                                                    <p className="text-sm text-[rgb(var(--c-neutral-500))]">{setting.desc}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--c-primary-500))]"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-[rgb(var(--c-neutral-200))] pt-6">
                                    <h3 className="text-lg font-bold text-[rgb(var(--c-neutral-900))] mb-4">Security Settings</h3>
                                    <div className="space-y-3">
                                        <button className="w-full text-left p-4 bg-[rgb(var(--c-neutral-50))] rounded-lg hover:bg-[rgb(var(--c-neutral-100))] transition-colors">
                                            <p className="font-semibold text-[rgb(var(--c-neutral-900))] mb-1">Change Password</p>
                                            <p className="text-sm text-[rgb(var(--c-neutral-500))]">Update your account password</p>
                                        </button>
                                        <button className="w-full text-left p-4 bg-[rgb(var(--c-neutral-50))] rounded-lg hover:bg-[rgb(var(--c-neutral-100))] transition-colors">
                                            <p className="font-semibold text-[rgb(var(--c-neutral-900))] mb-1">Two-Factor Authentication</p>
                                            <p className="text-sm text-[rgb(var(--c-neutral-500))]">Add an extra layer of security</p>
                                        </button>
                                        <button className="w-full text-left p-4 bg-[rgb(var(--c-neutral-50))] rounded-lg hover:bg-[rgb(var(--c-neutral-100))] transition-colors">
                                            <p className="font-semibold text-[rgb(var(--c-neutral-900))] mb-1">Login History</p>
                                            <p className="text-sm text-[rgb(var(--c-neutral-500))]">View recent login activity</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
