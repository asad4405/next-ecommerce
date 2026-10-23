import Link from "next/link";
import Image from "next/image";
import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";
import { ContactType, PolicyType, SettingsType, SocialType } from "@/types/Common";

interface SocialApiResponse {
    status: boolean;
    data: SocialType[];
    message: string;
}

interface PolicyApiResponse {
    status: boolean;
    data: PolicyType[];
    message: string;
}

export async function Footer() {
    let settings: SettingsType | null = null;
    let contact: ContactType | null = null;
    let socials: SocialType[] = [];
    let policies: PolicyType[] = [];
    let imageUrl = "";

    try {
        const [settingRes, contactRes, socialRes, policyRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/settings`, { cache: "no-store" }),
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact-info`, { cache: "no-store" }),
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media`, { cache: "no-store" }),
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/policy-pages`, { cache: "no-store" })
        ]);

        const settingsData = await settingRes.json();
        const contactData = await contactRes.json();
        const socialData: SocialApiResponse = await socialRes.json();
        const policyData: PolicyApiResponse = await policyRes.json();

        settings = settingsData.data;
        contact = contactData.data;
        socials = socialData.status ? socialData.data : [];
        policies = policyData.status ? policyData.data : [];
        imageUrl = process.env.NEXT_API_IMAGE_URL || "";
    } catch (error) {
        console.error("Error fetching footer data:", error);
    }

    return (
        <footer className="bg-white border-t border-slate-200 text-slate-700 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
                    
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            {settings?.dark_logo ? (
                                <div className="relative h-10 w-auto flex items-center">
                                    <Image
                                        src={`${imageUrl}/${settings.dark_logo}`}
                                        alt="Logo"
                                        width={150}
                                        height={40}
                                        className="h-10 w-auto object-contain"
                                        unoptimized={true}
                                    />
                                </div>
                            ) : (
                                <span className="text-xl font-black text-[#124170]">STORE</span>
                            )}
                        </Link>
                        
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                            {settings?.description || "Your ultimate destination for smart shopping. Get the best quality gadgets, electronics, and lifestyle products at amazing prices."}
                        </p>

                        {socials.length > 0 && (
                            <div className="flex items-center space-x-3 pt-2">
                                {socials.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.link || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.name}
                                        className="w-9 h-9 rounded-full bg-slate-100 hover:opacity-80 flex items-center justify-center transition text-slate-700 shadow-sm"
                                        style={{ backgroundColor: `${social.color}15`, color: social.color }}
                                    >
                                        <i className={`${social.icon} text-sm`} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
                            <li>
                                <Link href="/about" className="hover:text-[#124170] transition">About Us</Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-[#124170] transition">Shop All Products</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#124170] transition">Contact Us</Link>
                            </li>
                            <li>
                                <Link href="/track-order" className="hover:text-[#124170] transition">Track Order</Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-[#124170] transition">FAQ & Support</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                            Customer Care
                        </h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
                            {policies.length > 0 ? (
                                policies.map((policy) => (
                                    <li key={policy.id}>
                                        <Link 
                                            href={`/policy/${policy.slug}`} 
                                            className="hover:text-[#124170] transition"
                                        >
                                            {policy.name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <span className="text-slate-400">No policies found</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                            Get In Touch
                        </h3>
                        <ul className="space-y-3 text-xs sm:text-sm font-medium">
                            <li className="flex items-start gap-2.5">
                                <MapPin size={18} className="text-[#124170] shrink-0 mt-0.5" />
                                <span className="text-slate-600">{contact?.address || ""}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <PhoneCall size={16} className="text-[#124170] shrink-0" />
                                <span className="text-slate-600">{contact?.phone || ""}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail size={16} className="text-[#124170] shrink-0" />
                                <span className="text-slate-600">{contact?.email || ""}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Clock size={16} className="text-[#124170] shrink-0" />
                                <span className="text-slate-600">Sat - Thu: 10:00 AM - 8:00 PM</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
                    <p>
                        &copy; {new Date().getFullYear()} <span className="font-bold text-slate-800">STORE</span>. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4">
                        <span className="hover:text-[#124170] cursor-pointer">Secure Online Payment</span>
                        <span>•</span>
                        <span className="hover:text-[#124170] cursor-pointer">Cash On Delivery</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}