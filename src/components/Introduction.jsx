import profileImage from "../icons/haziq.png";
import { handleGA4Event } from "../lib/ga4";

export default function Introduction() {
  return (
    <div className="chart top">
      <h2 className="mb-4 title">Introduction</h2>
      <p>
        Introduction About Ourselves and Our Project
      </p>
      <br />
      <p>
        Some more introduction
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/groups/developerkaki/"
        >
          <span className="text-gradient"> Our Dataset Link</span>
        </a>
        
      </p>
      <br />
      <p>
        Some introduction about our charts
      </p>
      <br />
      

      <div class="flex-container">

        <div class="flex-child haziq">
        <div className="flex gap-4">
              <div className="h-[70px] w-[70px] p-1 rounded-full">
                <img src={profileImage} alt="Haziq Faiz" className="rounded-full" />
              </div>
              <div className="text-sm">
                <p className="font-semibold">Haziq Faiz</p>
                <p>1201302740</p>
              </div>
            </div>
        </div>
        
        <div class="flex-child uzair">
        <div className="flex gap-4">
              <div className="h-[70px] w-[70px] p-1 rounded-full">
                <img src={profileImage} alt="Uzair Razak" className="rounded-full" />
              </div>
              <div className="text-sm">
                <p className="font-semibold">Uzair Razak</p>
                <p>1201302740</p>
              </div>
            </div>
        </div>
        
        <div class="flex-child luqman">
        <div className="flex gap-4">
              <div className="h-[70px] w-[70px] p-1 rounded-full">
                <img src={profileImage} alt="Luqman" className="rounded-full" />
              </div>
              <div className="text-sm">
                <p className="font-semibold">Luqman</p>
                <p>1201302740</p>
              </div>
            </div>
        </div>
</div>


    </div>

  );
}
