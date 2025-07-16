export interface Plan {
    name: string;
    amount: number;
    currency: string;
    interval: string;
    isPopular?: boolean;
    description: string;
    features: string[]
}

export const availablePlans: Plan[] = [
    {
        name: "Weekly Plan",
        amount: 4.99,
        currency: "USD",
        interval: "week",
        description: "Great if you want to try the service before committing longer.",
        features: [
            "Unlimited AI workout plans",
            "AI Insights muscle gain and performance",
            "Cancel Anytime"
        ]
    }, {
        name: "Monthly Plan",
        amount: 9.99,
        currency: "USD",
        interval: "month",
        isPopular: true, // Marking this plan as the most popular
        description:
            "Perfect for ongoing, month-to-month workout planning and features.",
        features: [
            "Unlimited AI workout plans",
            "Priority AI support",
            "Cancel anytime",
        ],
    },
    {
        name: "Yearly Plan",
        amount: 49.99,
        currency: "USD",
        interval: "year",
        description:
            "Best value for those committed to improving their training performance long-term.",
        features: [
            "Unlimited AI workout plans",
            "All premium features",
            "Cancel anytime",
        ],
    },
]

const priceIdMap: Record<string, string> = {
    week: process.env.STRIPE_PRICE_WEEKLY!,
    month: process.env.STRIPE_PRICE_MONTHLY!,
    year: process.env.STRIPE_PRICE_YEARLY!,
};

export const getPriceIdFromType = (planType: string) => priceIdMap[planType];