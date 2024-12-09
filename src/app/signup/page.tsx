
const Signup = () => (
  <div>
    <section className="text-center py-12">
      <h2 className="text-3xl">Sign Up</h2>
      <form className="max-w-md mx-auto mt-8">
        <input className="w-full p-3 border rounded mb-4" type="text" placeholder="Full Name" />
        <input className="w-full p-3 border rounded mb-4" type="email" placeholder="Email" />
        <input className="w-full p-3 border rounded mb-4" type="password" placeholder="Password" />
        <button className="bg-secondary text-accent w-full p-3 rounded hover:bg-primary transition-all">
          Sign Up
        </button>
      </form>
    </section>
  </div>
);

export default Signup;
