import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, message, service, date, timeSlot, formType } = data;

    const isBooking = formType === "appointment" || !!service;
    const subject = isBooking
      ? `New Appointment Request from ${name || "Patient"} - DDS Dental`
      : `New Contact Inquiry from ${name || "Visitor"} - DDS Dental`;

    // 1. Save lead locally to data/leads.json for backup and record keeping
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, "leads.json");
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        try {
          leads = JSON.parse(fs.readFileSync(leadsFile, "utf-8"));
        } catch {
          leads = [];
        }
      }
      leads.unshift({
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        formType: isBooking ? "appointment" : "contact",
        name: name || "",
        email: email || "",
        phone: phone || "",
        message: message || null,
        service: service || null,
        date: date || null,
        timeSlot: timeSlot || null,
      });
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf-8");
    } catch (saveError) {
      console.error("Error saving lead to data/leads.json:", saveError);
    }

    // 2. Dispatch email directly to drpritimunde@gmail.com via FormSubmit AJAX service
    try {
      const payload: Record<string, string> = {
        _subject: subject,
        _template: "table",
        _captcha: "false",
        "Form Type": isBooking ? "Book an Appointment" : "Contact Form Inquiry",
        "Patient Name": name || "N/A",
        "Phone Number": phone || "N/A",
        "Email Address": email || "N/A",
      };

      if (isBooking) {
        payload["Requested Treatment"] = service || "N/A";
        payload["Preferred Date"] = date || "Not specified";
        payload["Preferred Time Slot"] = timeSlot || "N/A";
      }

      if (message) {
        payload["Message / Note"] = message;
      }

      await fetch("https://formsubmit.co/ajax/drpritimunde@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (emailError) {
      console.error("Error dispatching email to drpritimunde@gmail.com:", emailError);
    }

    return NextResponse.json({ success: true, message: "Submission received and dispatched" });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to process submission" }, { status: 500 });
  }
}
