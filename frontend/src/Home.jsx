import "./Home.css";
import { Link } from "react-router-dom";
import AddDog from "./AddDog";
export default function home() {
  return (
    <>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6">
            <h1>Excellence in Every Breed. Loyalty in Every Heart.</h1>
            <h1>Your Journey to Forever Friendship Starts Here</h1>
            <h1>Because the Best Memories Have Four Paws</h1>
            <p className="mt-5">
              At our home of happy paws, we believe a dog is not just a pet but
              a lifelong companion who fills your world with unconditional love,
              endless loyalty, and unforgettable moments. From playful puppies
              to noble guardians, every breed carries a unique spirit waiting to
              become part of your story. We are here to connect hearts, create
              forever families, and celebrate the extraordinary bond between
              humans and their four-legged best friends — because life is simply
              better with a wagging tail by your side.
            </p>
            <Link to="/dogs" className="btn btn-dark">
              Make Your Funny Friend
            </Link>
            </div>
          <div className="col-6  img-fluid w-100">
            <img
              className="im"
              src="https://www.shutterstock.com/image-photo/different-breeds-dogs-playing-together-600nw-2180733301.jpg"
            />
          </div>
        </div>
      </div>



    

    <div className="container">
  <div className="row align-items-center">
    
<div className="col-6">
      <img
        className="img-fluid w-100 im"
        src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&auto=format&fit=crop&q=60"
        alt="Happy dogs"
      />
    </div>

    <div className="col-6">
      <h1>Discover Companionship Like Never Before</h1>
      <h1>A Bond Built on Trust, Love & Loyalty</h1>

      <p className="mt-5">
        Welcome to a world where wagging tails and joyful barks create
        unforgettable memories. We believe every dog carries a heart full of
        devotion, ready to bring warmth and happiness into your life. Whether
        you’re looking for an energetic adventure partner or a gentle cuddle
        companion, your forever friend is waiting right here. Step into a place
        where love is unconditional, loyalty is endless, and every day begins
        with a happy bark.
      </p>

      <Link to="/dogs" className="btn btn-dark">
        Find Your Loyal Companion
      </Link>
    </div>

    

  </div>
</div>


<div className="align-items-center text-center mb-5">
<Link to="/add-dog" className="btn btn-success ">
  Add Dog
</Link>
</div>

    </>
  );
}
