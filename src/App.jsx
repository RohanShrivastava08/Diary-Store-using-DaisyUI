import { useEffect, useMemo, useState } from "react";

export default function App() {
  // ---------------- Minimal Store State ----------------
  const FALLBACK =
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0ea?q=80&w=1600&auto=format&fit=crop"; // notebook + pen (reliable)

  const imgOnError = (e) => {
    if (e.currentTarget?.src !== FALLBACK) e.currentTarget.src = FALLBACK;
  };

  const PRODUCTS = [
    // Curated notebook/diary/planner images from Unsplash with stable IDs
    {
      id: "n1",
      title: "Classic Ruled Journal • A5",
      price: 1099,
      tag: "New",
      paper: "100 gsm",
      img: "https://images.unsplash.com/photo-1623697899811-f2403f50685e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRpYXJ5fGVufDB8fDB8fHww",
      cat: "Journals",
      rating: 4.7,
    },
    {
      id: "n2",
      title: "Dot Grid Notebook • B5 (160p)",
      price: 999,
      tag: "Popular",
      paper: "120 gsm",
      img: "https://images.unsplash.com/photo-1616593772450-6220bc809944?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JpZCUyMG5vdGVib29rfGVufDB8fDB8fHww",
      cat: "Notebooks",
      rating: 4.6,
    },
    {
      id: "n3",
      title: "Minimal Weekly Planner • 2025",
      price: 1299,
      tag: "2025",
      paper: "90 gsm",
      img: "https://images.unsplash.com/photo-1506485338023-6ce5f36692df?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2Vla2x5JTIwcGxhbm5lcnxlbnwwfHwwfHx8MA%3D%3D",
      cat: "Planners",
      rating: 4.5,
    },
    {
      id: "n4",
      title: "Artist Sketchbook • A4 (Plain)",
      price: 949,
      tag: "Thick",
      paper: "140 gsm",
      img: "https://images.unsplash.com/photo-1615717146113-495e481c17c9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJ0aXN0JTIwc2tldGNoYm9va3xlbnwwfHwwfHx8MA%3D%3D",
      cat: "Sketchbooks",
      rating: 4.4,
    },
    {
      id: "n5",
      title: "Aquarelle Pad • A3 Cold-Press",
      price: 1299,
      tag: "Watercolor",
      paper: "300 gsm",
      img: "https://plus.unsplash.com/premium_photo-1676930551268-54f8608306e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QXF1YXJlbGxlJTIwUGFkJTIwZGlhcnl8ZW58MHx8MHx8fDA%3D",
      cat: "Sketchbooks",
      rating: 4.5,
    },
    {
      id: "n6",
      title: "Cork Cover Journal • A5",
      price: 899,
      tag: "Eco",
      paper: "100 gsm",
      img: "https://images.unsplash.com/photo-1605888963294-6ed699ea8949?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvcmslMjBjb3ZlciUyMGpvdXJuYWx8ZW58MHx8MHx8fDA%3D",
      cat: "Journals",
      rating: 4.3,
    },
    {
      id: "n7",
      title: "Brass Rollerball Pen",
      price: 1799,
      tag: "Heirloom",
      paper: "—",
      img: "https://images.unsplash.com/photo-1667234297100-f19963cc6fd5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnJhc3MlMjByb2xsZXJiYWxsJTIwcGVufGVufDB8fDB8fHww",
      cat: "Pens",
      rating: 4.6,
    },
    {
      id: "n8",
      title: "Planner Stickers • Minimal Icons",
      price: 299,
      tag: "Set",
      paper: "—",
      img: "https://plus.unsplash.com/premium_photo-1705178701080-1e0eae873f7e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFBMQU5ORVIlMjBTVElDS0VSU3xlbnwwfHwwfHx8MA%3D%3D",
      cat: "Accessories",
      rating: 4.1,
    },
    {
      id: "n9",
      title: "Soft Linen Notebook • A5",
      price: 799,
      tag: "Calm",
      paper: "100 gsm",
      img: "https://images.unsplash.com/photo-1611571741792-edb58d0ceb67?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c29mdCUyMGxpbmVuJTIwbm90ZWJvb2t8ZW58MHx8MHx8fDA%3D",
      cat: "Notebooks",
      rating: 4.4,
    },
    {
      id: "n10",
      title: "Hardbound Journal • A6 Pocket",
      price: 549,
      tag: "Pocket",
      paper: "90 gsm",
      img: "https://images.unsplash.com/photo-1685180446177-c7c6d3446f3b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFyZGJvdW5kJTIwam91cm5hbHxlbnwwfHwwfHx8MA%3D%3D",
      cat: "Journals",
      rating: 4.2,
    },
    // --- Added two more Journal cards as requested ---
    {
      id: "n11",
      title: "Leather-bound Journal • A5",
      price: 1599,
      tag: "Premium",
      paper: "120 gsm",
      img: "https://images.unsplash.com/photo-1563433806666-dcd6b9860bda?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxlYXRoZXIlMjBib3VuZCUyMGpvdXJuYWx8ZW58MHx8MHx8fDA%3D",
      cat: "Journals",
      rating: 4.8,
    },
    {
      id: "n12",
      title: "Recycled Kraft Journal • A5",
      price: 699,
      tag: "Eco+",
      paper: "100 gsm",
      img: "https://images.unsplash.com/photo-1698913463089-6c95fd110e83?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHJlY3ljbGVkJTIwa3JhZnQlMjBqb3VybmFsfGVufDB8fDB8fHww",
      cat: "Journals",
      rating: 4.3,
    },
  ];

  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [active, setActive] = useState(null);
  const [toast, setToast] = useState(false);

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.cat)))];

  const cartCount = useMemo(
    () => Object.values(cart).reduce((a, b) => a + b, 0),
    [cart]
  );
  const total = useMemo(
    () =>
      Object.entries(cart).reduce((sum, [id, qty]) => {
        const p = PRODUCTS.find((x) => x.id === id);
        return sum + (p ? p.price * qty : 0);
      }, 0),
    [cart]
  );

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "All") list = list.filter((p) => p.cat === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (sort === "price_low") list.sort((a, b) => a.price - b.price);
    if (sort === "price_high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, search, sort]);

  const add = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setToast(true);
  };
  const sub = (id) => {
    setCart((prev) => {
      const c = { ...prev };
      if (!c[id]) return c;
      c[id] -= 1;
      if (c[id] <= 0) delete c[id];
      return c;
    });
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 1200);
    return () => clearTimeout(t);
  }, [toast]);

  // ---------------- UI ----------------
  return (
    <>
      <div
        data-theme="pastel"
        className="min-h-dvh flex flex-col font-sans text-base-content"
        style={{
          // Minimal softer gradient + more whitespace for classy look
          background:
            "linear-gradient(180deg, rgba(255,250,235,0.7) 0%, rgba(248,248,248,0.85) 40%, #ffffff 100%)",
        }}
      >
        {/* Top Notice */}
        <div className="w-full border-b bg-base-100/70 backdrop-blur">
          <div className="mx-auto w-full max-w-7xl px-6 py-2 text-center text-xs tracking-wide">
            Free shipping above ₹999 • Code <span className="font-semibold">WRITE10</span> • Minimal, durable & classy
          </div>
        </div>

        {/* Header / Navbar */}
        <header className="sticky top-0 z-40 bg-base-100/80 backdrop-blur border-b">
          <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <a className="flex items-center gap-2 select-none" href="#">
              <span className="text-xl font-black tracking-tight">noted.</span>
              <span className="badge badge-ghost">est. 2025</span>
            </a>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <button className="link link-hover" onClick={() => setCategory("All")}>Shop</button>
              <button className="link link-hover" onClick={() => setCategory("Journals")}>Journals</button>
              <button className="link link-hover" onClick={() => setCategory("Notebooks")}>Notebooks</button>
              <button className="link link-hover" onClick={() => setCategory("Planners")}>Planners</button>
              <button className="link link-hover" onClick={() => setCategory("Sketchbooks")}>Sketchbooks</button>
              <a className="link link-hover" href="#about">About</a>
            </nav>

            <div className="flex items-center gap-2">
              <label className="input input-bordered hidden md:flex items-center gap-2 w-64">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5 opacity-70" viewBox="0 0 24 24" fill="none">
                  <path stroke="currentColor" strokeWidth="2" d="m21 21-3.5-3.5M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search products…"
                  className="grow"
                />
              </label>

              <button className="btn btn-primary btn-sm" onClick={() => document.getElementById("cart_modal").showModal()}>
                <div className="indicator">
                  <span>Cart</span>
                  {cartCount > 0 && <span className="badge badge-xs indicator-item">{cartCount}</span>}
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="w-full">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-3xl border bg-base-100/60 mt-6 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                    Minimal stationery for <span className="text-primary">maximum clarity</span>.
                  </h1>
                  <p className="opacity-70 mt-3">
                    Handcrafted journals, dot-grid notebooks, serene planners & artist-grade sketch pads — designed to
                    keep your desk calm and your ideas sharp.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button className="btn btn-primary" onClick={() => setCategory("Journals")}>Shop Journals</button>
                    <button className="btn btn-ghost" onClick={() => setCategory("Notebooks")}>Dot Grid</button>
                    <button className="btn btn-outline" onClick={() => setCategory("Planners")}>2025 Planners</button>
                  </div>
                </div>
                <figure className="relative min-h-64 md:min-h-80">
                  <img
                    onError={imgOnError}
                    src="https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1800&auto=format&fit=crop"
                    alt="Minimal desk with notebook"
                    className="h-full w-full object-cover"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* Trust / Feature bar */}
        <section className="w-full">
          <div className="mx-auto max-w-7xl px-6 mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                ["Acid-Free Paper", "Fountain-pen friendly, no bleed."],
                ["Lay-Flat Binding", "Opens 180° for easy writing."],
                ["Sustainable", "Responsible materials & pack."],
                ["Made to Last", "Sturdy covers, archival pages."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border bg-base-100 p-4">
                  <div className="font-semibold tracking-tight">{title}</div>
                  <p className="text-xs opacity-70 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="w-full">
          <div className="mx-auto max-w-5xl px-6 mt-10 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">About Noted</h2>
            <p className="opacity-70 mt-2 max-w-3xl mx-auto">
              We craft quiet, beautiful tools for thinking. Our books are Smyth-sewn to open flat, printed on archival
              paper, and designed with understated details so your ideas stay front and center.
            </p>
          </div>
        </section>

        {/* Controls */}
        <section className="w-full">
          <div className="mx-auto max-w-7xl px-6 mt-10">
            <div className="grid md:grid-cols-3 gap-3">
              <label className="input input-bordered flex items-center gap-2 md:col-span-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5 opacity-70" viewBox="0 0 24 24" fill="none">
                  <path stroke="currentColor" strokeWidth="2" d="m21 21-3.5-3.5M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search journals, notebooks, planners…"
                  className="grow"
                />
              </label>

              <div className="join w-full">
                <button className={`btn join-item ${sort === "featured" ? "btn-active" : ""}`} onClick={() => setSort("featured")}>
                  Featured
                </button>
                <button className={`btn join-item ${sort === "rating" ? "btn-active" : ""}`} onClick={() => setSort("rating")}>
                  Top Rated
                </button>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn join-item">Price</div>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
                    <li><a onClick={() => setSort("price_low")}>Low → High</a></li>
                    <li><a onClick={() => setSort("price_high")}>High → Low</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Category chips */}
            <div className="no-scrollbar flex gap-2 overflow-x-auto mt-3 pb-1">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`btn btn-sm rounded-full ${category === c ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="w-full">
          <div className="mx-auto max-w-7xl px-6 mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-24">
            {filtered.map((p) => (
              <article key={p.id} className="card bg-base-100 border rounded-2xl overflow-hidden hover:shadow-sm transition">
                <figure className="relative aspect-[4/3]">
                  <img onError={imgOnError} src={p.img} alt={p.title} className="h-full w-full object-cover" />
                  <span className="badge badge-primary absolute left-3 top-3">{p.tag}</span>
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-base">{p.title}</h3>
                  <p className="text-xs opacity-70">{p.paper}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="rating rating-xs">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <input key={i} type="radio" className="mask mask-star-2" readOnly checked={Math.round(p.rating) === i} />
                      ))}
                    </div>
                    <span className="text-xs opacity-70">{p.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-extrabold">₹{p.price.toLocaleString()}</span>
                    <div className="join">
                      <button className="btn btn-sm join-item btn-ghost" onClick={() => setActive(p)}>View</button>
                      <button className="btn btn-sm join-item btn-primary" onClick={() => add(p.id)}>Add</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Highlight Banner */}
        <section className="w-full">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-3xl border bg-base-100/60 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight">Keep your desk calm.</h3>
                <p className="opacity-70 text-sm mt-1">Soft palettes, gentle textures, and perfectly aligned grids.</p>
              </div>
              <button className="btn btn-outline" onClick={() => setCategory("Notebooks")}>Explore Notebooks</button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full">
          <div className="mx-auto max-w-7xl px-6 mt-10">
            <div className="rounded-3xl border bg-base-100 p-6">
              <h3 className="font-bold text-xl mb-3">What users say</h3>
              <div className="carousel rounded-box space-x-4">
                {[
                  ["“Paper is superb — my fountain pens never feather.”", "Aditi, Mumbai"],
                  ["“Minimal design + numbered pages = bullet journal heaven.”", "Karan, Delhi"],
                  ["“Watercolor pad handled wet-on-wet without warping.”", "Sana, Pune"],
                  ["“Opens flat, sturdy cover, perfect everyday carry.”", "Rohit, Indore"],
                ].map(([quote, name]) => (
                  <div key={name} className="carousel-item w-5/6 md:w-1/3">
                    <div className="card bg-base-200 p-4 h-full">
                      <p className="text-sm">{quote}</p>
                      <div className="mt-2 text-xs opacity-70">— {name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature List (website features) */}
        <section className="w-full">
          <div className="mx-auto max-w-7xl px-6 mt-10">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                ["Express Checkout", "Smooth cart with quick view & fast checkout."],
                ["Smart Filters", "Price, rating & category chips to find fast."],
                ["Lightweight UI", "DaisyUI + Tailwind for speed & clarity."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border bg-base-100 p-5">
                  <div className="font-bold">{title}</div>
                  <p className="text-sm opacity-70 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full">
          <div className="mx-auto max-w-5xl px-6 mt-10">
            <h3 className="text-xl font-extrabold tracking-tight mb-3">FAQs</h3>
            <div className="join join-vertical w-full">
              {[
                ["Which paper works best with fountain pens?", "Try our 100–120 gsm journals and dot-grid notebooks for minimal ghosting and no bleed."],
                ["Do notebooks open flat?", "Yes, we use Smyth-sewn binding across journals and notebooks."],
                ["Shipping & returns?", "Free shipping above ₹999. Easy 7-day returns on unused products."],
              ].map(([q, a]) => (
                <div key={q} className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
                  <input type="checkbox" />
                  <div className="collapse-title text-sm font-medium">{q}</div>
                  <div className="collapse-content">
                    <p className="text-sm opacity-80">{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="w-full">
          <div className="mx-auto max-w-7xl px-6 mt-10 mb-12">
            <div className="hero rounded-3xl bg-gradient-to-r from-secondary/10 to-primary/10 border">
              <div className="hero-content flex-col md:flex-row items-start md:items-center justify-between w-full py-8 gap-6">
                <div>
                  <h3 className="text-2xl font-extrabold">Get launch drops first</h3>
                  <p className="opacity-70 text-sm">Early access to limited editions & refills.</p>
                </div>
                <div className="join w-full md:max-w-md">
                  <input type="email" className="input input-bordered join-item w-full" placeholder="your@email.com" />
                  <button className="btn btn-primary join-item">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-2">
          <div className="mx-auto max-w-7xl px-6">
            <div className="divider my-6"></div>
            <div className="grid md:grid-cols-4 gap-6 pb-8">
              <div className="space-y-2">
                <div className="text-lg font-extrabold">noted.</div>
                <p className="text-sm opacity-70">Minimal stationery for focused minds.</p>
              </div>
              <div>
                <div className="font-bold mb-2">Shop</div>
                <ul className="menu menu-compact">
                  {["Journals", "Notebooks", "Planners", "Sketchbooks", "Accessories"].map((x) => (
                    <li key={x}><a onClick={() => setCategory(x)}>{x}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-bold mb-2">Help</div>
                <ul className="menu menu-compact">
                  <li><a>Shipping</a></li>
                  <li><a>Returns</a></li>
                  <li><a>Warranty</a></li>
                </ul>
              </div>
              <div>
                <div className="font-bold mb-2">Stay in touch</div>
                <div className="join w-full">
                  <input type="email" className="input input-bordered join-item w-full" placeholder="email" />
                  <button className="btn btn-primary join-item">Join</button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pb-8 text-sm opacity-70">
              <span>© {new Date().getFullYear()} Noted Stationery</span>
              <span>Designed with calm ✍️</span>
            </div>
          </div>
        </footer>

        {/* Quick View Modal */}
        <dialog id="quick_modal" className={`modal ${active ? "modal-open" : ""}`} onClose={() => setActive(null)}>
          <div className="modal-box max-w-md p-0 overflow-hidden">
            {active && (
              <>
                <figure className="relative">
                  <img onError={imgOnError} src={active.img} alt={active.title} className="h-64 w-full object-cover" />
                  <span className="badge badge-primary absolute left-3 top-3">{active.tag}</span>
                  <button className="btn btn-circle btn-sm absolute right-3 top-3" onClick={() => setActive(null)}>✕</button>
                </figure>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold">{active.title}</h3>
                  <p className="text-xs opacity-70">{active.paper}</p>
                  <div className="flex items-center gap-2">
                    <div className="rating rating-sm">
                      {[1,2,3,4,5].map(i => (
                        <input key={i} type="radio" className="mask mask-star-2" readOnly checked={Math.round(active.rating)===i} />
                      ))}
                    </div>
                    <span className="text-xs opacity-70">{active.rating}</span>
                  </div>
                  <p className="text-sm opacity-80">Clean layout • Lay-flat • Fountain-pen friendly.</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-2xl font-extrabold">₹{active.price.toLocaleString()}</span>
                    <button className="btn btn-primary" onClick={() => { add(active.id); setActive(null); }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <form method="dialog" className="modal-backdrop" onClick={() => setActive(null)}>
            <button>close</button>
          </form>
        </dialog>

        {/* Cart Modal */}
        <dialog id="cart_modal" className="modal">
          <div className="modal-box max-w-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Your Cart</h3>
              <form method="dialog"><button className="btn btn-ghost btn-sm">Close</button></form>
            </div>
            <div className="divider my-2"></div>

            <div className="space-y-3 max-h-96 overflow-auto pr-1">
              {Object.keys(cart).length === 0 && <p className="opacity-70">Your cart is empty.</p>}
              {Object.entries(cart).map(([id, qty]) => {
                const p = PRODUCTS.find((x) => x.id === id);
                if (!p) return null;
                return (
                  <div key={id} className="flex items-center gap-3">
                    <img onError={imgOnError} src={p.img} alt={p.title} className="size-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold leading-tight">{p.title}</div>
                      <div className="text-sm opacity-70">₹{p.price.toLocaleString()}</div>
                    </div>
                    <div className="join">
                      <button className="btn btn-sm join-item" onClick={() => sub(id)}>–</button>
                      <button className="btn btn-sm join-item no-animation">Qty {qty}</button>
                      <button className="btn btn-sm join-item" onClick={() => add(id)}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="divider my-3"></div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-70">Subtotal</div>
                <div className="text-xl font-extrabold">₹{total.toLocaleString()}</div>
              </div>
              <button className="btn btn-primary" disabled={cartCount === 0}>Checkout</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Toast */}
        {toast && (
          <div className="toast toast-end">
            <div className="alert alert-success"><span>Added to cart!</span></div>
          </div>
        )}
      </div>
    </>
  );
}
