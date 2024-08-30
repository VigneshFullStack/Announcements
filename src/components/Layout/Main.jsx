import CarouselSlider from "../common/Slider/CarouselSlider";
import LatestNews from "../common/Latest-News/LatestNews";
import Announcements from "../common/Announcement/Announcements";
import UpcomingHolidays from "../common/Upcoming-Holiday/UpcomingHolidays";
import Calendar from "../common/Calendar/Calendar";

const Main = () => (
  <div className="row">
    <div className="col-md-7 col-lg-8 col-xxl-9">
      <CarouselSlider />
      <LatestNews />
      <div className="row">
        <div className="col-md-6">
          <Announcements />
        </div>
        <div className="col-md-6">
          <UpcomingHolidays />
        </div>
      </div>
    </div>
    <div className="col-md-5 col-lg-4 col-xxl-3">
      <div className="calendar-wrapper">
        <Calendar />
      </div>
    </div>
  </div>
);

export default Main;
