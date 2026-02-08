import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
    {
        platform: {
            type: String,
            required: true,
            enum: ["youtube", "facebook", "instagram", "twitter", "linkedin", "whatsapp"],
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
        icon: {
            type: String,
            default: "🔗",
        },
        displayOrder: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        showInFooter: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Set default icons based on platform
socialLinkSchema.pre("save", function (next) {
    if (!this.icon || this.icon === "🔗") {
        const iconMap = {
            youtube: "🎥",
            facebook: "👍",
            instagram: "📷",
            twitter: "🐦",
            linkedin: "💼",
            whatsapp: "💬",
        };
        this.icon = iconMap[this.platform] || "🔗";
    }
    next();
});

// Check if model exists before creating to prevent OverwriteModelError
const SocialLink = mongoose.models.SocialLink || mongoose.model("SocialLink", socialLinkSchema);
export default SocialLink;
