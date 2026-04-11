'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';

// ---------------------------------------------------------------------------
// Re-usable helpers
// ---------------------------------------------------------------------------

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay },
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const plans = [
    {
        id: 'basic',
        label: 'বেসিক',
        labelStyle: {
            color: 'var(--color-p-secondary)',
            background: 'var(--color-p-surface-container-high)',
        },
        price: '০৳',
        period: '/ চিরকাল',
        description: 'নতুন কৃষকদের জন্য আদর্শ যারা ডিজিটাল কৃষি শুরু করতে চান।',
        features: [
            'আবহাওয়া পূর্বাভাস (দৈনিক)',
            'বেসিক শস্য ক্যালেন্ডার',
            'কমিউনিটি ফোরাম অ্যাক্সেস',
        ],
        buttonLabel: 'বিনামূল্যে শুরু করুন',
        buttonStyle: {
            background: 'var(--color-p-surface-container-highest)',
            color: 'var(--color-p-primary)',
        },
        highlighted: false,
    },
    {
        id: 'pro',
        label: 'প্রো',
        labelStyle: {
            color: 'var(--color-p-primary)',
            background: 'var(--color-p-secondary-container)',
        },
        price: '৯৯৯৳',
        period: '/ মাস',
        description: 'উন্নত কৃষি প্রযুক্তি এবং বিশেষজ্ঞদের পরামর্শের জন্য।',
        features: [
            'AI ভিত্তিক পোকা শনাক্তকরণ',
            'সরাসরি কৃষি বিশেষজ্ঞ চ্যাট',
            'উন্নত মাটির গুণাগুণ বিশ্লেষণ',
            'বাজার দরের রিয়েল-টাইম আপডেট',
        ],
        buttonLabel: 'প্রো প্ল্যান নিন',
        buttonStyle: null, // gradient – handled separately
        highlighted: true,
    },
    {
        id: 'enterprise',
        label: 'এন্টারপ্রাইজ',
        labelStyle: {
            color: 'var(--color-p-tertiary)',
            background: 'var(--color-p-tertiary-fixed)',
        },
        price: 'কাস্টম',
        period: '',
        description: 'বড় খামার বা কৃষি ভিত্তিক প্রতিষ্ঠানের জন্য কাস্টম সমাধান।',
        features: [
            'আনলিমিটেড ডিভাইস অ্যাক্সেস',
            'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার',
            'আইওটি (IoT) সেন্সর ইন্টিগ্রেশন',
        ],
        buttonLabel: 'আমাদের সাথে যোগাযোগ করুন',
        buttonStyle: {
            background: 'var(--color-p-surface-container-highest)',
            color: 'var(--color-p-on-surface)',
        },
        highlighted: false,
    },
];

const comparisonRows = [
    {
        feature: 'আবহাওয়া আপডেট',
        basic: 'দৈনিক',
        pro: 'ঘণ্টাভিত্তিক',
        enterprise: 'হাইপার-লোকাল',
        type: 'text',
    },
    {
        feature: 'AI পেস্ট ডিটেকশন',
        basic: false,
        pro: true,
        enterprise: true,
        type: 'bool',
    },
    {
        feature: 'বিশেষজ্ঞ পরামর্শ',
        basic: 'কমিউনিটি',
        pro: 'সরাসরি চ্যাট',
        enterprise: '২৪/৭ কল ও সাপোর্ট',
        type: 'text',
    },
    {
        feature: 'শস্য ডায়াগনস্টিকস',
        basic: 'সীমিত',
        pro: 'আনলিমিটেড',
        enterprise: 'আনলিমিটেড',
        type: 'text',
    },
    {
        feature: 'IoT ডাটা কানেক্টিভিটি',
        basic: false,
        pro: false,
        enterprise: true,
        type: 'bool',
    },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PlanCard({ plan, index }: { plan: (typeof plans)[0]; index: number }) {
    const cardBase: React.CSSProperties = {
        backgroundColor: 'var(--color-p-surface-container-lowest)',
        borderRadius: '1.5rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
    };

    const highlightedExtra: React.CSSProperties = plan.highlighted
        ? {
              boxShadow: '0 20px 50px rgba(0,110,42,0.12)',
              border: '2px solid var(--color-p-primary-container)',
              position: 'relative',
          }
        : {};

    return (
        <motion.div
            {...fadeUp(index * 0.1)}
            style={{ ...cardBase, ...highlightedExtra }}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        >
            {/* Popular badge */}
            {plan.highlighted && (
                <div
                    style={{
                        position: 'absolute',
                        top: '-1rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(135deg, var(--color-p-primary), var(--color-p-primary-container))',
                        color: 'var(--color-p-on-primary)',
                        padding: '0.375rem 1.5rem',
                        borderRadius: '9999px',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap',
                    }}
                >
                    সবচেয়ে জনপ্রিয়
                </div>
            )}

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <span
                    style={{
                        ...plan.labelStyle,
                        fontWeight: 700,
                        padding: '0.25rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                    }}
                >
                    {plan.label}
                </span>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-p-on-surface)' }}>
                        {plan.price}
                    </span>
                    {plan.period && (
                        <span style={{ color: 'var(--color-p-on-surface-variant)' }}>{plan.period}</span>
                    )}
                </div>
                <p style={{ marginTop: '1rem', color: 'var(--color-p-on-surface-variant)', fontSize: '0.875rem' }}>
                    {plan.description}
                </p>
            </div>

            {/* Features */}
            <div style={{ flexGrow: 1, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {plan.features.map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <CheckCircle
                            size={20}
                            style={{ color: 'var(--color-p-primary)', flexShrink: 0, marginTop: '0.1rem' }}
                            fill="var(--color-p-primary)"
                            stroke="white"
                            strokeWidth={1.5}
                        />
                        <span style={{ color: 'var(--color-p-on-surface)' }}>{f}</span>
                    </div>
                ))}
            </div>

            {/* CTA */}
            {plan.highlighted ? (
                <button
                    style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, var(--color-p-primary), var(--color-p-primary-container))',
                        color: 'var(--color-p-on-primary)',
                        fontWeight: 700,
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        boxShadow: '0 4px 20px rgba(0,110,42,0.3)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                    }}
                >
                    {plan.buttonLabel}
                </button>
            ) : (
                <button
                    style={{
                        width: '100%',
                        ...plan.buttonStyle,
                        fontWeight: 700,
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                    }}
                >
                    {plan.buttonLabel}
                </button>
            )}
        </motion.div>
    );
}

function TableCell({ value, type }: { value: string | boolean; type: string }) {
    if (type === 'bool') {
        return (
            <td style={{ padding: '1.5rem 0', textAlign: 'center' }}>
                {value ? (
                    <CheckCircle
                        size={20}
                        style={{ color: 'var(--color-p-primary)', display: 'inline-block' }}
                        fill="var(--color-p-primary)"
                        stroke="white"
                        strokeWidth={1.5}
                    />
                ) : (
                    <X size={20} style={{ color: 'var(--color-p-error)', display: 'inline-block' }} />
                )}
            </td>
        );
    }
    return (
        <td style={{ padding: '1.5rem 0', textAlign: 'center', color: 'var(--color-p-on-surface)' }}>
            {value as string}
        </td>
    );
}

// ---------------------------------------------------------------------------
// Main Export
// ---------------------------------------------------------------------------

export function PricingContent() {
    return (
        <main
            style={{
                maxWidth: '1440px',
                margin: '0 auto',
                padding: '4rem 3rem',
                fontFamily: 'var(--font-noto-sans-bengali), sans-serif',
            }}
        >
            {/* ── Hero ── */}
            <motion.section {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h1
                    style={{
                        fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        marginBottom: '1.5rem',
                        color: 'var(--color-p-on-surface)',
                        lineHeight: 1.2,
                    }}
                >
                    আপনার কৃষির জন্য সঠিক পরিকল্পনা
                </h1>
                <p
                    style={{
                        fontSize: '1.125rem',
                        color: 'var(--color-p-on-surface-variant)',
                        maxWidth: '38rem',
                        margin: '0 auto',
                        lineHeight: 1.7,
                    }}
                >
                    আধুনিক প্রযুক্তি ব্যবহার করে আপনার খামারের উৎপাদনশীলতা বাড়ান। আমাদের সহজ এবং কার্যকরী
                    সাবস্ক্রিপশন প্ল্যান থেকে বেছে নিন আপনার প্রয়োজন অনুযায়ী।
                </p>
            </motion.section>

            {/* ── Pricing Cards ── */}
            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    alignItems: 'stretch',
                    marginBottom: '8rem',
                }}
            >
                {plans.map((plan, i) => (
                    <PlanCard key={plan.id} plan={plan} index={i} />
                ))}
            </section>

            {/* ── Feature Comparison Table ── */}
            <motion.section
                {...fadeUp(0.1)}
                style={{
                    backgroundColor: 'var(--color-p-surface-container-low)',
                    borderRadius: '1.5rem',
                    padding: '3rem',
                    overflowX: 'auto',
                    marginBottom: '8rem',
                }}
            >
                <h2
                    style={{
                        fontSize: '1.875rem',
                        fontWeight: 700,
                        marginBottom: '3rem',
                        textAlign: 'center',
                        color: 'var(--color-p-on-surface)',
                    }}
                >
                    ফিচার তুলনা
                </h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr
                                style={{
                                    borderBottom: '1px solid rgba(187,203,184,0.3)',
                                }}
                            >
                                <th style={{ padding: '1.5rem 0', fontWeight: 700, color: 'var(--color-p-on-surface)', fontSize: '1.125rem' }}>
                                    ফিচার
                                </th>
                                <th style={{ padding: '1.5rem 0', textAlign: 'center', color: 'var(--color-p-on-surface)', fontWeight: 600 }}>
                                    বেসিক
                                </th>
                                <th style={{ padding: '1.5rem 0', textAlign: 'center', color: 'var(--color-p-primary)', fontWeight: 700 }}>
                                    প্রো
                                </th>
                                <th style={{ padding: '1.5rem 0', textAlign: 'center', color: 'var(--color-p-on-surface)', fontWeight: 600 }}>
                                    এন্টারপ্রাইজ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonRows.map((row, i) => (
                                <tr
                                    key={row.feature}
                                    style={{
                                        borderBottom:
                                            i < comparisonRows.length - 1
                                                ? '1px solid rgba(187,203,184,0.15)'
                                                : 'none',
                                    }}
                                >
                                    <td
                                        style={{
                                            padding: '1.5rem 0',
                                            color: 'var(--color-p-on-surface-variant)',
                                        }}
                                    >
                                        {row.feature}
                                    </td>
                                    <TableCell value={row.basic} type={row.type} />
                                    <TableCell value={row.pro} type={row.type} />
                                    <TableCell value={row.enterprise} type={row.type} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.section>

            {/* ── Visual Accent Banner ── */}
            <motion.section
                {...fadeUp(0.15)}
                style={{
                    position: 'relative',
                    height: '400px',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                }}
                className="group"
            >
                {/* Background image */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKJz5v6225CqiNbCJ1KZfMn9HEOVKH7tQj8_kovPjZpBU0JLH06u5AsGubVKROoQBhiwQz-fj7HxxgSJtXSNy9Clugui6U9HOdz1aODpO1fRl9IPHe0abyfBZ5NEuG3gxhF1oUGTqDuzgNBaAb-CdCFuiRiLBrMnLafWAfJeuYUw5r9XwdiSxHFvnazfOsj9CYWO8KYhTtAQhWBSPeyBgkOBuNTIP64iXiW5WD5o3TD4zZP0MobU5JVuZl_yaEnn2Ir0145UnEhAE')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {/* Gradient overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,110,42,0.8), transparent)',
                    }}
                />
                {/* Content */}
                <div
                    style={{
                        position: 'relative',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '3rem',
                        color: '#ffffff',
                    }}
                >
                    <h3 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem' }}>
                        কৃষিতে আনুন ডিজিটাল বিপ্লব
                    </h3>
                    <p style={{ maxWidth: '36rem', fontSize: '1.125rem', opacity: 0.9, lineHeight: 1.7 }}>
                        হাজার হাজার আধুনিক কৃষক এখন কৃষি বন্ধু ব্যবহার করে তাদের জীবনযাত্রার মান উন্নয়ন করছেন।
                        আপনি কখন শুরু করছেন?
                    </p>
                </div>
            </motion.section>
        </main>
    );
}
