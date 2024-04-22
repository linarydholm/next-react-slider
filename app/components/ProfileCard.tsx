import Image from 'next/image';

type Profile = {
  profile: {
    image: {
      src: string;
      title: string;
      alt: string;
      width: number;
      height: number;
    };
    person: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
};

export function ProfileCard({ profile }: Profile) {
  // console.log('x', profiles);

  return (
    <div className="Container">
      <div className="Card bg-gray-200 p-6 rounded-lg">
        <div className="Background flex flex-col">
          <div className="ImageDiv w-80 h-80 overflow-hidden rounded-full flex items-center justify-center relative">
            <Image
              className="object-cover z-0"
              src={profile.image.src}
              alt={profile.image.alt}
              width={2000}
              height={2000}
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="pt-6 font-semibold text-lg">
              {profile.person.firstName} {profile.person.lastName}
            </p>
            <p className="pt-1">{profile.person.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
