import Image from "next/image";

const Profile = () => {
  return (
    <div className="flex gap-6 p-4 justify-center">
      <div className="flex flex-col gap-4 justify-start">
        <Image 
          src={`https://images.stockcake.com/public/7/5/2/752210ff-3ce6-447b-8529-7deec989d405_large/wriggling-earthworm-closeup-stockcake.jpg`}
          alt="profile"
          width={200}
          height={200}
          className="rounded-full"
        />

        <p>Worm Rainy</p>

        <div className="flex flex-col gap-2">
          <p>email</p>
          <p>worm@worm.com</p>
        </div>

        <div className="flex flex-col gap-2">
          <p>password</p>
          <p>**********</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
