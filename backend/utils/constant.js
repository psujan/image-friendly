const allowedImageExtensions =  ['jpeg','jpg','png','avif','tiff','webp']

// Compression presets
const compressionPresets = {
    low: { quality: 90, progressive: true },
    medium: { quality: 75, progressive: true },
    high: { quality: 60, progressive: true },
    maximum: { quality: 40, progressive: true }
};

export {
    allowedImageExtensions,
    compressionPresets
}