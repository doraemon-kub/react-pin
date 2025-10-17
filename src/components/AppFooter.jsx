import React from 'react';
// อย่าลืมติดตั้งไอคอน: npm install react-bootstrap-icons
import { Facebook, Instagram } from 'react-bootstrap-icons';

const AppFooter = () => {
  // --- ✨ แก้ไขข้อมูลของคุณตรงนี้ได้เลย ---
  const university = "มหาวิทยาลัยศรีปทุม";
  const faculty = "คณะเทคโนโลยีสารสนเทศ";
  const major = "สาขา CSI";
  const facebookUrl = "https://www.facebook.com/artlnw.zagodoffun/"; // ใส่ลิงก์ Facebook
  const instagramUrl = "https://www.instagram.com/hisham__mmmm/"; // ใส่ลิงก์ Instagram
  // ------------------------------------

  return (
    <footer className="bg-dark text-white text-center p-4">
      <div className="container">

        {/* ส่วนข้อมูลการศึกษา: รวมอยู่ในบรรทัดเดียว */}
        <div className="mb-3">
          <p className="mb-0 fs-5">
            {university} &bull; {faculty} &bull; {major}
          </p>
        </div>

        {/* ส่วนข้อมูลติดต่อ: หัวข้อและลิงก์แยกบรรทัดกัน */}
        <div>
          <h5>ติดต่อ</h5>
          <div> {/* ครอบลิงก์ด้วย div เพื่อให้ลงบรรทัดใหม่ */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-3 fs-3"
              aria-label="Facebook Profile"
            >
              <Facebook />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white fs-3"
              aria-label="Instagram Profile"
            >
              <Instagram />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default AppFooter;