import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function JoinUsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 px-8 flex flex-col lg:flex-row items-center justify-center gap-10 bg-[#0d1b3d] text-[#ceccca]">
          {/* Left content */}
          <div className="max-w-xl">
            <h2 className="text-5xl font-extrabold mb-6">Join Our Community</h2>
            <p className="text-[#ceccca]/80 mb-8 text-lg leading-relaxed">
              Connect with fellow pilots, share your flights, and stay updated with the latest{" "}
              <span className="font-semibold text-[#ceccca]">Royal Japan Airlines</span> news on our Discord server.
            </p>
            <ul className="space-y-3 text-lg">
              <li>🛫 Share your flight experiences</li>
              <li>🗺️ Get help with flight planning</li>
              <li>📢 Company announcements</li>
              <li>🤝 Group flights and social events</li>
            </ul>
            <a
              href="https://discord.gg/evf2yah4QH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 bg-[#ceccca] text-[#0d1b3d] font-semibold px-6 py-3 rounded-xl hover:bg-white transition"
            >
              Join Discord
            </a>
          </div>

          {/* Discord Widget */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#ceccca]/30">
            <iframe
              src="https://discord.com/widget?id=1267870143787171901&theme=dark"
              width="350"
              height="500"
              allowTransparency="true"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
