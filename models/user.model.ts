import { createHashPassword, verifyHashPassword } from "@/lib/crypto-hash";
import { sendEmail } from "@/services/sendEmail";
import { model, models, Schema, Types } from "mongoose";


export enum PLANTYPE {
    FREE = "free",
    PREMIUM = "premium",

}

export enum ROLE {
    USER = "user",
    ADMIN = "admin",
}

export enum STATUS {
    ACTIVE = "active",
    INACTIVE = "inactive",
    BANNED = "banned",
    BLOCK = "block",
    DELETED = "deleted",
}

export interface IUSer {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    slug?: string;
    avatar?: string;
    role?: ROLE;
    otp?: {
        code: string;
        expiresAt: Date;
        slug: string;
    };
    isTwoFactorEnabled: boolean,
    isVerified: boolean;
    fermaerId?: string;
    system_config: {
        notification: {
            email: boolean,
            system_notification: boolean,
            safety_alert: boolean,
        }
    },
    // plan?: {
    //     type: PLANTYPE;
    //     startDate: Date;
    //     endDate: Date;
    //     token: number;
    //     planId: Types.ObjectId;
    // }
    status: STATUS;
    accessToken?: string;
    refreshToken?: string;
    createdAt?: Date;
    updatedAt?: Date;

}


const userSchema = new Schema<IUSer>({
    name: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: ROLE,
        default: ROLE.USER
    },
    otp: {
        code: {
            type: String,
            max: 4,
            min: 4
        },
        expiresAt: {
            type: Date,
        },
        slug: {
            type: String,
        }
    },
    isTwoFactorEnabled: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    fermaerId: {
        type: String,
        unique: true,
        index: true
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    status: {
        type: String,
        enum: STATUS,
        default: STATUS.ACTIVE
    },
    system_config: {
        notification: {
            email: {
                type: Boolean,
                default: false
            },
            system_notification: {
                type: Boolean,
                default: false
            },
            safety_alert: {
                type: Boolean,
                default: false
            }
        }
    },
    // plan: {
    //     type: {
    //         type: String,
    //         enum: PLANTYPE,
    //         default: PLANTYPE.FREE
    //     },
    //     startDate: {
    //         type: Date,

    //     },
    //     endDate: {
    //         type: Date,
    //     },
    //     token: {
    //         type: Number,
    //         default: 0
    //     },
    //     planId: {
    //         type: Schema.Types.ObjectId,
    //         ref: "Plan"
    //     }
    // }
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const { slug, hash } = createHashPassword(this.password);
        this.password = hash;
        this.slug = slug;
    }
});

userSchema.methods.generateOTP = async function () {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const { slug, hash } = createHashPassword(otp);
    const otpData = {
        code: hash,
        expiresAt: expiresAt,
        slug: slug
    }

    await sendEmail(this.email, "Verify your email", otp);
    this.otp = otpData;
    return otpData;
}

userSchema.methods.verifyOTP = function (otp: string) {
    const verifyOTP = verifyHashPassword(otp, this.otp.slug, this.otp.code);
    if (verifyOTP) {
        this.isVerified = true;
        this.otp = "";
        this.otpExpires = undefined;
        this.save();
        return true;
    }
    return false;
}

export const User = models.User || model<IUSer>("User", userSchema);