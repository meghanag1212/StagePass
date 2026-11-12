import React, { useMemo, useState } from 'react';
import { Search, MapPin, CalendarDays, ArrowUpRight, Ticket, Music2, SlidersHorizontal, X, Minus, Plus, CheckCircle2, Menu } from 'lucide-react';

const events = [
  { id: 1, title: 'The Indie Collective', artist: 'Live music · 4 artists', category: 'Music', date: 'NOV 22', day: 'Saturday', time: '6:30 PM', venue: 'Phoenix Marketcity', city: 'Bengaluru', price: 799, tag: 'TRENDING', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85', tone: 'purple' },
  { id: 2, title: 'An Evening of Jazz', artist: 'The Blue Notes Quartet', category: 'Music', date: 'NOV 28', day: 'Friday', time: '7:00 PM', venue: 'The Humming Tree', city: 'Bengaluru', price: 599, tag: 'INTIMATE', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=85', tone: 'blue' },
  { id: 3, title: 'Canvas & Conversations', artist: 'Art workshop · All levels', category: 'Arts', date: 'DEC 03', day: 'Wednesday', time: '11:00 AM', venue: 'Lahe Lahe', city: 'Bengaluru', price: 450, tag: 'WORKSHOP', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85', tone: 'orange' },
  { id: 4, title: 'The Comedy Room', artist: 'Stand-up · 5 comedians', category: 'Comedy', date: 'DEC 06', day: 'Saturday', time: '8:00 PM', venue: 'Good Shepherd Auditorium', city: 'Bengaluru', price: 399, tag: 'SELLING FAST', image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=1200&q=85', tone: 'red' },
  { id: 5, title: 'Sunset Sessions', artist: 'Acoustic live experience', category: 'Music', date: 'DEC 12', day: 'Friday', time: '5:30 PM', venue: 'Rooftop Social', city: 'Bengaluru', price: 699, tag: 'NEW', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=85', tone: 'gold' },
  { id: 6, title: 'Design Futures 2026', artist: 'Talks · Design · Community', category: 'Learning', date: 'DEC 18', day: 'Thursday', time: '10:00 AM', venue: 'The Lalit Ashok', city: 'Bengaluru', price: 999, tag: 'LIMITED SEATS', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85', tone: 'green' }
];

const categories = ['All events', 'Music', 'Arts', 'Comedy', 'Learning'];
const money = n => '₹' + n.toLocaleString('en-IN');

function App() {
  const [activeCategory, setActiveCategory] = useState('All events');
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [selected, setSelected] = useState(null);
  const [quantities, setQuantities] = useState({ General: 1, Premium: 0, VIP: 0 });
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  const filtered = useMemo(() => events.filter(e => {
    const matchesCategory = activeCategory === 'All events' || e.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch = !q || [e.title, e.artist, e.venue, e.category].join(' ').toLowerCase().includes(q);
    const matchesCity = !city || e.city.toLowerCase().includes(city.toLowerCase());
    return matchesCategory && matchesSearch && matchesCity;
  }), [activeCategory, search, city]);

  const openBooking = event => {
    setSelected(event);
    setQuantities({ General: 1, Premium: 0, VIP: 0 });
  };
  const total = selected ? quantities.General * selected.price + quantities.Premium * Math.round(selected.price * 1.6) + quantities.VIP * Math.round(selected.price * 2.3) : 0;
  const count = Object.values(quantities).reduce((a,b) => a+b, 0);

  const confirmBooking = () => {
    if (!count) return;
    const booking = { id: 'SP' + Math.random().toString(36).slice(2,8).toUpperCase(), event: selected.title, date: selected.date, seats: count, total };
    setBookings(prev => [booking, ...prev]);
    setSelected(null);
    setToast('Booking confirmed! Your demo ticket is ready.');
    window.setTimeout(() => setToast(''), 3500);
  };

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#"><span className="brand-mark"><Ticket size={19}/></span>stagepass<span className="brand-dot">.</span></a>
      <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>
        <a href="#events" onClick={() => setMobileMenu(false)}>Explore events</a>
        <a href="#how" onClick={() => setMobileMenu(false)}>How it works</a>
        <a href="#about" onClick={() => setMobileMenu(false)}>About</a>
      </nav>
      <div className="top-actions">
        <button className="text-button" onClick={() => document.getElementById('events').scrollIntoView({behavior:'smooth'})}>Find tickets</button>
        <button className="menu-button" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}><Menu size={21}/></button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot"></span> YOUR CITY. YOUR SCENE.</div>
          <h1>Make room for<br/><em>good times.</em></h1>
          <p className="hero-sub">The shows, sounds and experiences worth showing up for. Find your next favourite moment.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#events">Explore events <ArrowUpRight size={17}/></a>
            <span className="hero-note">Curated experiences, just a click away.</span>
          </div>
          <div className="hero-stats">
            <div><strong>120<span>+</span></strong><small>Live experiences</small></div>
            <div><strong>18<span>k</span></strong><small>Happy attendees</small></div>
            <div><strong>4.9<span>/5</span></strong><small>Community rating</small></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo"></div>
          <div className="photo-label"><span className="label-icon"><Music2 size={16}/></span><div><b>Live a little louder.</b><small>Discover something unforgettable</small></div><ArrowUpRight size={18}/></div>
          <div className="floating-date"><span>NOV</span><b>22</b><small>SATURDAY</small></div>
          <div className="hero-stamp">LIVE<br/>NOW</div>
        </div>
      </section>

      <section className="trust-strip">
        <span>THE CITY IS YOURS TO EXPLORE</span><i></i><span>BOOK IN A FEW CLICKS</span><i></i><span>MAKE MEMORIES OFFLINE</span>
      </section>

      <section className="events-section" id="events">
        <div className="section-heading">
          <div><div className="eyebrow muted">FIND YOUR NEXT PLAN</div><h2>Events worth <em>experiencing.</em></h2></div>
          <p>From front-row energy to slow Sunday afternoons, there’s something happening for everyone.</p>
        </div>
        <div className="search-panel">
          <div className="search-field"><Search size={19}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search artists, events, venues..." aria-label="Search events"/></div>
          <div className="search-divider"></div>
          <div className="location-field"><MapPin size={18}/><select value={city} onChange={e => setCity(e.target.value)} aria-label="Choose city"><option>Bengaluru</option><option>Mumbai</option><option>Delhi</option><option>Chennai</option><option>Hyderabad</option></select></div>
          <button className="search-button" onClick={() => document.getElementById('event-grid').scrollIntoView({behavior:'smooth'})}>Search events</button>
        </div>
        <div className="filter-row">
          <div className="category-tabs">{categories.map(c => <button key={c} className={activeCategory===c?'category active':'category'} onClick={() => setActiveCategory(c)}>{c}</button>)}</div>
          <span className="result-count"><SlidersHorizontal size={15}/> {filtered.length} experiences</span>
        </div>
        <div className="event-grid" id="event-grid">
          {filtered.map(event => <article className="event-card" key={event.id}>
            <div className="event-image-wrap">
              <img src={event.image} alt="" className="event-image" onError={e => {e.currentTarget.style.display='none'; e.currentTarget.parentElement.classList.add('image-fallback')}}/>
              <span className="event-tag">{event.tag}</span>
              <button className="quick-book" onClick={() => openBooking(event)} aria-label={'Book '+event.title}><ArrowUpRight size={18}/></button>
            </div>
            <div className="event-info">
              <div className="event-meta"><span><CalendarDays size={14}/>{event.date} · {event.day}</span><span>{event.time}</span></div>
              <h3>{event.title}</h3><p className="artist">{event.artist}</p>
              <div className="event-bottom"><div className="venue"><MapPin size={14}/><span>{event.venue}</span></div><div className="price"><small>FROM</small><b>{money(event.price)}</b></div></div>
              <button className="card-book" onClick={() => openBooking(event)}>Book tickets <ArrowUpRight size={15}/></button>
            </div>
          </article>)}
        </div>
        {filtered.length===0 && <div className="empty-state"><Search size={28}/><h3>No events found</h3><p>Try another search or choose a different category or city.</p><button className="outline-button" onClick={() => {setSearch('');setActiveCategory('All events');setCity('Bengaluru')}}>Clear filters</button></div>}
      </section>

      <section className="feature-band" id="how">
        <div className="feature-left"><div className="eyebrow light">LESS SCROLLING. MORE LIVING.</div><h2>Your next great<br/><em>story starts here.</em></h2><p>Discover local favourites and new experiences. Booking your next plan should feel as good as the event itself.</p><a href="#events" className="light-button">Find your event <ArrowUpRight size={16}/></a></div>
        <div className="feature-steps">
          <div className="step"><span>01</span><div><b>Discover</b><p>Explore handpicked events happening around you.</p></div><Search size={20}/></div>
          <div className="step"><span>02</span><div><b>Choose your spot</b><p>Pick the ticket type that fits your night.</p></div><Ticket size={20}/></div>
          <div className="step"><span>03</span><div><b>Show up & enjoy</b><p>Your plans are set. All that’s left is the moment.</p></div><CheckCircle2 size={20}/></div>
        </div>
      </section>

      <section className="newsletter" id="about"><div><div className="eyebrow muted">A LITTLE SOMETHING IN YOUR INBOX</div><h2>Good plans. <em>Great timing.</em></h2><p>Get a note when something exciting is happening in your city.</p></div><form onSubmit={e => {e.preventDefault();setToast('You’re on the list. See you out there!');e.currentTarget.reset();window.setTimeout(()=>setToast(''),3000)}}><input type="email" required placeholder="Your email address" aria-label="Email address"/><button type="submit">Keep me posted <ArrowUpRight size={16}/></button></form></section>
    </main>

    <footer className="footer"><a className="brand footer-brand" href="#"><span className="brand-mark"><Ticket size={18}/></span>stagepass<span className="brand-dot">.</span></a><span>© 2026 StagePass. Made for moments that matter.</span><div><a href="#events">Explore</a><a href="#how">How it works</a><a href="#about">Contact</a></div></footer>

    {selected && <div className="modal-backdrop" onMouseDown={e => {if(e.target===e.currentTarget)setSelected(null)}}><div className="booking-modal" role="dialog" aria-modal="true" aria-label="Book tickets">
      <div className="modal-head"><div><span className="eyebrow muted">RESERVE YOUR SPOT</span><h2>{selected.title}</h2><p><CalendarDays size={14}/> {selected.date} · {selected.time} <span>·</span> <MapPin size={14}/> {selected.venue}</p></div><button className="close-button" onClick={() => setSelected(null)} aria-label="Close"><X size={20}/></button></div>
      <div className="ticket-options">
        {[['General',selected.price,'Standard entry'],['Premium',Math.round(selected.price*1.6),'Priority entry'],['VIP',Math.round(selected.price*2.3),'Premium experience']].map(([name,price,desc])=><div className="ticket-option" key={name}><div><b>{name}</b><small>{desc}</small><strong>{money(price)}</strong></div><div className="quantity"><button onClick={() => setQuantities(q=>({...q,[name]:Math.max(0,q[name]-1)}))} aria-label={'Remove '+name}><Minus size={14}/></button><b>{quantities[name]}</b><button onClick={() => setQuantities(q=>({...q,[name]:Math.min(8,q[name]+1)}))} aria-label={'Add '+name}><Plus size={14}/></button></div></div>)}
      </div>
      <div className="modal-total"><span>{count} ticket{count===1?'':'s'} · Total</span><b>{money(total)}</b></div>
      <button className="confirm-button" disabled={!count} onClick={confirmBooking}>Confirm demo booking <ArrowUpRight size={17}/></button>
      <p className="demo-note">Demo checkout — no payment will be collected.</p>
    </div></div>}
    {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
    {bookings.length>0 && <button className="booking-count" onClick={() => setToast('Latest booking: '+bookings[0].event+' · '+bookings[0].id)}><Ticket size={16}/> My bookings ({bookings.length})</button>}
  </div>;
}

export default App;
