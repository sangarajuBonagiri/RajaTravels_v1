import { BUSINESS } from "./constants";

export function generateWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encoded}`;
}

export function formatBookingMessage(data: {
  serviceType: string;
  startPoint: string;
  destination: string;
  journeyDate: string;
  busType: string;
  customerName: string;
  phone: string;
  message?: string;
}): string {
  const isBusRental = data.serviceType === "Bus Rental";
  
  return `✨ *New ${data.serviceType} Inquiry*
━━━━━━━━━━━━━━━━━━━━
🛠️ *Service:* ${data.serviceType}
📍 *Pickup:* ${data.startPoint}
📍 *Destination:* ${data.destination}
📅 *Journey Date:* ${data.journeyDate}
${isBusRental && data.busType ? `🚍 *Bus Type:* ${data.busType}\n` : ""}👤 *Name:* ${data.customerName}
📞 *Phone:* ${data.phone}
${data.message ? `💬 *Message:* ${data.message}` : ""}
━━━━━━━━━━━━━━━━━━━━
_Sent from Raja Travels Website_`;
}

export function formatPackageInquiry(packageName: string): string {
  return `Hi! I'm interested in the *${packageName}* package. Please share more details and availability.

_Sent from Raja Travels Website_`;
}

export function smoothScrollTo(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
