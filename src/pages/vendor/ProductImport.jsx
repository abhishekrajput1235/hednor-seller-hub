import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Upload, Download, FileSpreadsheet, AlertCircle, 
    CheckCircle, XCircle, ChevronDown, ChevronUp, Eye
} from 'lucide-react';

const ProductImport = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Upload, 2: Mapping, 3: Validation, 4: Import, 5: Results
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [importProgress, setImportProgress] = useState(0);
    const [showInstructions, setShowInstructions] = useState(false);
    
    // Mock data for demonstration
    const [parsedData, setParsedData] = useState([]);
    const [fieldMapping, setFieldMapping] = useState({});
    const [validationResults, setValidationResults] = useState({ valid: [], invalid: [] });
    const [importResults, setImportResults] = useState({ success: 0, failed: 0, errors: [] });

    // Available fields for mapping
    const availableFields = [
        { key: 'name', label: 'Product Name', required: true },
        { key: 'sku', label: 'SKU', required: true },
        { key: 'price', label: 'Price', required: true },
        { key: 'comparePrice', label: 'Compare Price', required: false },
        { key: 'stock', label: 'Stock Quantity', required: true },
        { key: 'category', label: 'Category', required: false },
        { key: 'description', label: 'Description', required: false },
        { key: 'shortDescription', label: 'Short Description', required: false },
        { key: 'brand', label: 'Brand', required: false },
        { key: 'tags', label: 'Tags', required: false },
        { key: 'weight', label: 'Weight', required: false },
        { key: 'images', label: 'Image URLs', required: false },
    ];

    // Handle file upload
    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            // Simulate parsing
            setTimeout(() => {
                // Mock parsed data
                const mockColumns = ['Product Name', 'SKU', 'Price', 'Stock', 'Category', 'Description'];
                const mockData = [
                    { 'Product Name': 'Test Product 1', 'SKU': 'TP-001', 'Price': '29.99', 'Stock': '100', 'Category': 'Electronics', 'Description': 'A test product' },
                    { 'Product Name': 'Test Product 2', 'SKU': 'TP-002', 'Price': '49.99', 'Stock': '50', 'Category': 'Clothing', 'Description': 'Another test product' },
                    { 'Product Name': '', 'SKU': 'TP-003', 'Price': 'invalid', 'Stock': '25', 'Category': 'Home', 'Description': 'Product with errors' },
                    { 'Product Name': 'Test Product 4', 'SKU': 'TP-004', 'Price': '79.99', 'Stock': '200', 'Category': 'Sports', 'Description': 'Valid product' },
                    { 'Product Name': 'Test Product 5', 'SKU': '', 'Price': '19.99', 'Stock': '75', 'Category': 'Books', 'Description': 'Missing SKU' },
                ];
                
                // Auto-suggest mapping
                const suggestedMapping = {};
                mockColumns.forEach(col => {
                    const normalizedCol = col.toLowerCase().replace(/\s+/g, '');
                    const match = availableFields.find(f => 
                        f.label.toLowerCase().replace(/\s+/g, '') === normalizedCol ||
                        f.key.toLowerCase() === normalizedCol
                    );
                    if (match) {
                        suggestedMapping[col] = match.key;
                    }
                });
                
                setParsedData(mockData);
                setFieldMapping(suggestedMapping);
                setStep(2);
            }, 500);
        }
    };

    // Handle drop zone
    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            const event = { target: { files: [droppedFile] } };
            handleFileUpload(event);
        }
    };

    // Validate data
    const handleValidate = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const valid = [];
            const invalid = [];
            
            parsedData.forEach((row, index) => {
                const errors = [];
                const mappedName = Object.keys(fieldMapping).find(k => fieldMapping[k] === 'name');
                const mappedSku = Object.keys(fieldMapping).find(k => fieldMapping[k] === 'sku');
                const mappedPrice = Object.keys(fieldMapping).find(k => fieldMapping[k] === 'price');
                
                if (mappedName && !row[mappedName]) {
                    errors.push('Product name is required');
                }
                if (mappedSku && !row[mappedSku]) {
                    errors.push('SKU is required');
                }
                if (mappedPrice && (isNaN(parseFloat(row[mappedPrice])) || parseFloat(row[mappedPrice]) <= 0)) {
                    errors.push('Invalid price');
                }
                
                if (errors.length > 0) {
                    invalid.push({ row: index + 1, data: row, errors });
                } else {
                    valid.push({ row: index + 1, data: row });
                }
            });
            
            setValidationResults({ valid, invalid });
            setIsProcessing(false);
            setStep(3);
        }, 1000);
    };

    // Start import
    const handleImport = () => {
        setStep(4);
        setImportProgress(0);
        
        const totalItems = validationResults.valid.length;
        let processed = 0;
        
        const interval = setInterval(() => {
            processed++;
            setImportProgress(Math.round((processed / totalItems) * 100));
            
            if (processed >= totalItems) {
                clearInterval(interval);
                setImportResults({
                    success: validationResults.valid.length,
                    failed: validationResults.invalid.length,
                    errors: validationResults.invalid.map(item => ({
                        row: item.row,
                        errors: item.errors
                    }))
                });
                setStep(5);
            }
        }, 500);
    };

    // Download template
    const handleDownloadTemplate = () => {
        // In real app, trigger download
        alert('Template download started (simulated)');
    };

    // Download error report
    const handleDownloadErrorReport = () => {
        // In real app, trigger download
        alert('Error report download started (simulated)');
    };

    const columns = parsedData.length > 0 ? Object.keys(parsedData[0]) : [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => navigate('/seller/products')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bulk Import Products</h1>
                    <p className="text-gray-500">Import multiple products at once using a CSV or Excel file</p>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4">
                {[
                    { num: 1, label: 'Upload' },
                    { num: 2, label: 'Mapping' },
                    { num: 3, label: 'Validation' },
                    { num: 4, label: 'Import' },
                    { num: 5, label: 'Results' }
                ].map((s, index) => (
                    <div key={s.num} className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                            step >= s.num 
                                ? 'bg-primary-600 text-white' 
                                : 'bg-gray-200 text-gray-600'
                        }`}>
                            {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                        </div>
                        <span className={`ml-2 text-sm ${step >= s.num ? 'text-gray-900' : 'text-gray-500'}`}>
                            {s.label}
                        </span>
                        {index < 4 && (
                            <div className={`w-12 h-0.5 ml-4 ${step > s.num ? 'bg-primary-600' : 'bg-gray-200'}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step 1: Upload */}
            {step === 1 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    {/* Download Template */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Download Template</h3>
                        <p className="text-gray-500 mb-4">Start with our template to ensure your data is formatted correctly.</p>
                        <button
                            onClick={handleDownloadTemplate}
                            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <Download className="w-5 h-5" />
                            <span>Download CSV Template</span>
                        </button>
                    </div>

                    {/* Instructions */}
                    <div className="mb-6">
                        <button
                            onClick={() => setShowInstructions(!showInstructions)}
                            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                        >
                            {showInstructions ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            <span className="font-medium">Import Instructions</span>
                        </button>
                        {showInstructions && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li>Supported formats: CSV, XLSX, XLS</li>
                                    <li>Maximum file size: 10MB</li>
                                    <li>Required fields: Product Name, SKU, Price, Stock</li>
                                    <li>For multiple images, separate URLs with commas</li>
                                    <li>For tags, separate with commas</li>
                                    <li>Prices should be numeric (no currency symbols)</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Upload Zone */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-500 transition-colors"
                    >
                        <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
                        <p className="text-sm text-gray-400 mb-4">Supported formats: CSV, XLSX, XLS (Max 10MB)</p>
                        <input
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer"
                        >
                            <Upload className="w-5 h-5 mr-2" />
                            Browse Files
                        </label>
                    </div>
                </div>
            )}

            {/* Step 2: Mapping */}
            {step === 2 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Map Your Columns</h3>
                            <p className="text-gray-500">Match your file columns to product fields</p>
                        </div>
                        <button
                            onClick={() => setFieldMapping({})}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Reset Mapping
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Your Column</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Map To</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Sample Data</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {columns.map((col) => (
                                    <tr key={col}>
                                        <td className="px-4 py-3 text-gray-900 font-medium">{col}</td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={fieldMapping[col] || ''}
                                                onChange={(e) => setFieldMapping(prev => ({ ...prev, [col]: e.target.value }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="">-- Don't Import --</option>
                                                {availableFields.map(field => (
                                                    <option key={field.key} value={field.key}>
                                                        {field.label} {field.required && '*'}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 text-sm">
                                            {parsedData[0]?.[col] || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={() => { setStep(1); setFile(null); setParsedData([]); }}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleValidate}
                            disabled={isProcessing || !Object.values(fieldMapping).includes('name') || !Object.values(fieldMapping).includes('sku') || !Object.values(fieldMapping).includes('price')}
                            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? 'Validating...' : 'Validate Data'}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Validation */}
            {step === 3 && (
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                                <div>
                                    <p className="text-2xl font-bold text-green-600">{validationResults.valid.length}</p>
                                    <p className="text-green-700">Valid rows ready to import</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                            <div className="flex items-center space-x-3">
                                <XCircle className="w-8 h-8 text-red-600" />
                                <div>
                                    <p className="text-2xl font-bold text-red-600">{validationResults.invalid.length}</p>
                                    <p className="text-red-700">Rows with errors (will be skipped)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Errors List */}
                    {validationResults.invalid.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Rows with Errors</h3>
                            <div className="space-y-3">
                                {validationResults.invalid.map((item) => (
                                    <div key={item.row} className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <div className="flex items-start space-x-3">
                                            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                            <div>
                                                <p className="font-medium text-red-800">Row {item.row}</p>
                                                <ul className="list-disc list-inside text-sm text-red-700 mt-1">
                                                    {item.errors.map((error, i) => (
                                                        <li key={i}>{error}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between">
                            <button
                                onClick={() => setStep(2)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Back to Mapping
                            </button>
                            <div className="space-x-3">
                                <button
                                    onClick={() => navigate('/seller/products')}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel Import
                                </button>
                                <button
                                    onClick={handleImport}
                                    disabled={validationResults.valid.length === 0}
                                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Import {validationResults.valid.length} Products
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 4: Importing */}
            {step === 4 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Upload className="w-8 h-8 text-primary-600 animate-pulse" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Importing Products...</h3>
                        <p className="text-gray-500 mb-6">Please don't close this page</p>
                        
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                            <div 
                                className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${importProgress}%` }}
                            />
                        </div>
                        <p className="text-gray-600">
                            Processing: {Math.round(importProgress * validationResults.valid.length / 100)} of {validationResults.valid.length} products
                        </p>
                    </div>
                </div>
            )}

            {/* Step 5: Results */}
            {step === 5 && (
                <div className="space-y-6">
                    {/* Success Banner */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <div className="flex items-center space-x-4">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                            <div>
                                <h3 className="text-xl font-medium text-green-800">Import Complete!</h3>
                                <p className="text-green-700">
                                    Successfully imported {importResults.success} products
                                    {importResults.failed > 0 && ` (${importResults.failed} failed)`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Import Summary</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <p className="text-2xl font-bold text-gray-900">{parsedData.length}</p>
                                <p className="text-gray-600">Total Rows</p>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <p className="text-2xl font-bold text-green-600">{importResults.success}</p>
                                <p className="text-green-700">Imported</p>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <p className="text-2xl font-bold text-red-600">{importResults.failed}</p>
                                <p className="text-red-700">Failed</p>
                            </div>
                        </div>
                    </div>

                    {/* Error Report */}
                    {importResults.failed > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Failed Rows</h3>
                                <button
                                    onClick={handleDownloadErrorReport}
                                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download Error Report</span>
                                </button>
                            </div>
                            <div className="space-y-2">
                                {importResults.errors.map((error, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                        <span className="text-red-700">Row {error.row}: {error.errors.join(', ')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => navigate('/seller/products')}
                            className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                            <Eye className="w-5 h-5" />
                            <span>View Imported Products</span>
                        </button>
                        <button
                            onClick={() => { setStep(1); setFile(null); setParsedData([]); setValidationResults({ valid: [], invalid: [] }); }}
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Import More Products
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductImport;
