// routes/admin.js

var express = require("express");
var router = express.Router();
const { uploadPdf } = require("../helpers/multer");
const adminHelper = require("../helpers/data-helpers");

/* GET admin listing. */
router.get("/computer", async function (req, res, next) {
  if (req.session.adminLoggin) {
    req.session.department = "Computer Engineering";
    await adminHelper.getFile(req.session.department, (error, data) => {
      if (error) {
        res.render("error", { message: "Error fetching products", error });
      } else {
        res.render("admin/view-file", { admin: true, data });
      }
    });
  } else {
    res.redirect("/admin/admin-login");
  }
});

/* GET admin listing. */
router.get("/electronics", async function (req, res, next) {
  if (req.session.adminLoggin) {
    req.session.department = "Electronics Engineering";
    await adminHelper.getFile(req.session.department, (error, data) => {
      if (error) {
        res.render("error", { message: "Error fetching products", error });
      } else {
        res.render("admin/view-file", { admin: true, data });
      }
    });
  } else {
    res.redirect("/admin/admin-login");
  }
});

router.get("/printing", async function (req, res, next) {
  if (req.session.adminLoggin) {
    req.session.department = "Printing Technology";
    await adminHelper.getFile(req.session.department, (error, data) => {
      if (error) {
        res.render("error", { message: "Error fetching products", error });
      } else {
        res.render("admin/view-file", { admin: true, data });
      }
    });
  } else {
    res.redirect("/admin/admin-login");
  }
});

router.get("/add-files", (req, res, next) => {
  if (req.session.adminLoggin) {
    res.render("admin/add-files", {
      admin: true,
      department: req.session.department,
    });
  } else {
    res.redirect("/admin/admin-login");
  }
});

router.post("/filtered-subjects", (req, res) => {
  const { department, year, semester } = req.body;

  // Fetch subjects based on the selected year and semester from your database
  // Modify this logic according to your actual data
  let subjects = [];

  if (department === "c") {
    // Computer Department
    if (year === "1" && semester === "1") {
      subjects = [
        "Applied Physics I",
        "Applied Chemistry",
        "Mathematics I",
        "Communication skills in English",
        "Engineering Graphics",
        "Sports & yoga",
        "Engineering worshop practice",
        "Introduction to IT system lab",
      ];
    } else if (year === "1" && semester === "2") {
      subjects = [
        "Mathematics II",
        "Applied physics II",
        "Environmental science",
        "Fundametals of Electrical & electronics Engineering",
        "Problem solving & programming",
        "Communication skills in english lab",
        "Engineering worshop practice",
      ];
    } else if (year === "2" && semester === "3") {
      subjects = [
        "Computer organisation",
        "Programming in c",
        "Database management system",
        "Digital computer fundamentals",
        "Web technology lab",
        "Computer system hardware lab",
      ];
    } else if (year === "2" && semester === "4") {
      subjects = [
        "Object oriented programming",
        "Data Structure",
        "Computer communication & network",
        "Community skills in indian knowledge system",
        "Web programming lab",
        "Application development lab",
        "Minor project",
      ];
    } else if (year === "3" && semester === "5") {
      subjects = [
        "Artificial intelligence and Machine learning",
        "Operating System",
        "System Administrator",
        "Embedded system & real-time operating system",
        "Project management & software engineering",
      ];
    } else if (year === "3" && semester === "6") {
      subjects = [
        "Entrepreneurship and startup",
        "Internet of things",
        "Multimedia",
        "Indian constitution",
        "Computer network engineering lab",
        "Smart device programming lab",
        "Major project",
      ];
    }
  } else if (department === "e") {
    if (year === "1" && semester === "1") {
      subjects = [
        "Communication Skills in English",
        "Mathematics I",
        "Applied Physics I",
        "Applied Chemistry",
        "Engineering Graphics",
        "Applied Physics Lab",
        "Applied Chemistry Lab",
        "Introduction to IT Systems Lab",
        "Engineering Workshop Practice",
        "Sports and Yoga",
      ];
    } else if (year === "1" && semester === "2") {
      subjects = [
        "Mathematics II",
        "Applied Physics II",
        "Environmental Science",
        "Fundamentals of Electrical & Electronics Engineering",
        "Basic Electronics",
        "Communication Skills in English Lab",
        "Applied Physics Lab",
        "Fundamentals of Electrical & Electronics Engineering Lab",
        "Electronics Tinkering Workshop",
        "Engineering Workshop Practice",
      ];
    } else if (year === "2" && semester === "3") {
      subjects = [
        "Electric Circuits & Networks",
        "Principles of Electronic Communication",
        "Electronic Circuits",
        "Digital Electronics",
        "Fundamentals of C Programming",
        "Principles of Electronic Communication Lab",
        "Electronic Circuits Lab",
        "Digital Electronics Lab",
        "Fundamentals of C Programming Lab",
      ];
    } else if (year === "2" && semester === "4") {
      subjects = [
        "Microcontroller and Applications",
        "Electronic Measurements and Instrumentation",
        "Linear Integrated Circuits",
        "Community Skills in Indian Knowledge System",
        "Microcontroller and Applications Lab",
        "Linear Integrated Circuits Lab",
        "PCB and Prototyping Workshop",
        "Python Programming Lab",
        "Minor Project",
      ];
    } else if (year === "3" && semester === "5") {
      subjects = [
        "Industrial Management and Safety",
        "Embedded Systems",
        "Industrial Automation",
        "Optical Communication and Networking",
        "Microwave Devices and Radar",
        "Advanced Microprocessors",
        "Digital Communication",
        "Embedded Systems Lab",
        "Industrial Automation Lab",
        "Microwave Engineering Lab",
        "Digital Communication Lab",
        "Seminar",
        "Major Project",
      ];
    } else if (year === "3" && semester === "6") {
      subjects = [
        "Entrepreneurship and Startup",
        "Medical Electronics",
        "Verilog HDL & Programmable Logic Devices",
        "Consumer Electronics",
        "Concepts of IoT",
        "Contemporary Electronics",
        "Introduction to Hybrid and Electric Vehicles",
        "Introduction to Multimedia",
        "Indian Constitution",
        "Simulation Lab with Numerical Software",
        "Computer Hardware and Data Communication Lab",
        "Medical Electronics Lab",
        "Verilog HDL & PLD Lab",
        "Major Project",
      ];
    }
  } else if (department === "p") {
    if (year === "1" && semester === "1") {
      subjects = [
        "Communication Skills in English",
        "Mathematics I",
        "Applied Physics I",
        "Applied Chemistry",
        "Engineering Graphics",
        "Applied Physics Lab",
        "Applied Chemistry Lab",
        "Introduction to IT Systems Lab",
        "Engineering Workshop Practice",
        "Sports and Yoga",
      ];
    } else if (year === "1" && semester === "2") {
      subjects = [
        "Mathematics II",
        "Applied Physics II",
        "Environmental Science",
        "Fundamentals of Electrical & Electronics Engineering",
        "Basics of Printing Processes",
        "Communication Skills in English Lab",
        "Applied Physics Lab",
        "Fundamentals of Electrical & Electronics Engineering Lab",
        "Office Automation Workshop",
        "Engineering Workshop Practice",
      ];
    } else if (year === "2" && semester === "3") {
      subjects = [
        "Print Design",
        "Materials for Printing and Packaging",
        "Mechanism of Printing Machines-I",
        "Fundamentals of Color Reproduction",
        "Color Analysis Lab",
        "Material Testing Lab",
        "Desktop Publishing Workshop I",
        "Advanced Printing Machines Workshop I",
        "Basic Screen Printing Lab",
      ];
    } else if (year === "2" && semester === "4") {
      subjects = [
        "Mechanism of Printing Machines II",
        "Print Finishing & Conversion Techniques",
        "Digital Imaging Techniques",
        "Community Skills in Indian Knowledge System",
        "Master Preparation Workshop",
        "Print Finishing Workshop I",
        "Advanced Printing Machines Workshop II",
        "Desktop Publishing Workshop II",
        "Minor Project",
      ];
    } else if (year === "3" && semester === "5") {
      subjects = [
        "Industrial Management and Safety",
        "Packaging Techniques",
        "Print Marketing Management",
        "Advertising Techniques",
        "Maintenance Engineering & Quality Control",
        "Screen Printing",
        "Package Design Lab",
        "Advanced Printing Machines Workshop III",
        "Advertising Techniques Lab",
        "Troubleshooting Workshop",
        "Advanced Screen Printing Lab",
        "Seminar",
        "Major Project",
      ];
    } else if (year === "3" && semester === "6") {
      subjects = [
        "Entrepreneurship and Startup",
        "Specialized Printing Applications",
        "Green Printing and Waste Management",
        "Present Printing Industry",
        "News Paper & Periodical Publishing Industry",
        "Advancement in Packaging",
        "Security Printing",
        "Disaster Management (PT)",
        "Indian Constitution",
        "Press Standardization Lab",
        "Print finishing workshop II",
        "Specialized Printing Applications Lab",
        "Printing and Waste Management Lab",
        "Printing and Package Testing Lab",
        "Major Project",
      ];
    }
  }

  // Use the 'subjects' array as needed in your application logic
  console.log(subjects);

  // Send the subjects as a JSON response
  res.json({ subjects });
});

router.post("/get-subjects", (req, res) => {
  const year = req.body.year;
  const semester = req.body.semester;

  // Fetch subjects based on the selected year and semester from your database
  // Modify this logic according to your actual data
  let subjects = [];

  if (year === "1" && semester === "1") {
    subjects = [
      "Applied Physics I",
      "Applied Chemistry",
      "Mathematics I",
      "Communication skills in English",
      "Engineering Graphics",
      "Sports & yoga",
      "Engineering worshop practice",
      "Introduction to IT system lab",
    ];
  } else if (year === "1" && semester === "2") {
    subjects = [
      "Mathematics II",
      "Applied physics II",
      "Environmental science",
      "Fundametals of Electrical & electronics Engineering",
      "Problem solving & programming",
      "Communication skills in english lab",
      "Engineering worshop practice",
    ];
  } else if (year === "2" && semester === "3") {
    subjects = [
      "Computer organisation",
      "Programming in c",
      "Database management system",
      "Digital computer fundamentals",
      "Web technology lab",
      "Computer system hardware lab",
    ];
  } else if (year === "2" && semester === "4") {
    subjects = [
      "Object oriented programming",
      "Data Structure",
      "Computer communication & network",
      "Community skills in indian knowledge system",
      "Web programming lab",
      "Application development lab",
      "Minor project",
    ];
  } else if (year === "3" && semester === "5") {
    subjects = [
      "Artificial intelligence and Machine learning",
      "Operating System",
      "System Administrator",
      "Embedded system & real time operating system",
      "Project management & software engineering",
    ];
  } else if (year === "3" && semester === "6") {
    subjects = [
      "Enterpreneurship and startup",
      "Internet of things",
      "Multimedia",
      "Indian constitution",
      "Computer network engineering lab",
      "Smartdevice programming lab",
      "Major project",
    ];
  }

  // Send the subjects as a JSON response
  res.json({ subjects });
});

router.get("/delete/:id", async (req, res) => {
  const adminIdToDelete = req.params.id;
  console.log("hai", req.params.id);

  await adminHelper.deleteAdminById(adminIdToDelete);

  res.redirect("/admin");
});

router.post("/add-files", uploadPdf.single("file"), async (req, res) => {
  try {
    if (req.session.adminLoggin) {
      await adminHelper.addFile(
        req.body,
        req.file,
        req.session.department,
        (result) => {
          const _id = result;
          res.redirect("/admin/view-file");
        }
      );
    } else {
      res.redirect("/admin/admin-login");
    }
  } catch (error) {
    console.error(error);
    res.render("error", {
      admin: true,
      message: "Error adding product",
      error,
    });
  }
});

router.get("/edit-files/:id", async (req, res) => {
  if (req.session.adminLoggin) {
    const fileId = req.params.id;

    await adminHelper.getFileDetails(fileId, (file) => {
      console.log("File:", file);

      res.render("admin/edit-file", { admin: true, file });
    });
  } else {
    res.redirect("/admin/admin-login");
  }
});

router.post("/edit-files/:id", uploadPdf.single("file"), async (req, res) => {
  const currentId = req.params.id;
  const data = req.body;
  const newFile = req.file;

  await adminHelper.editProducts(currentId, data, newFile, (result) => {
    console.log("Product updated successfully:", result);
    res.redirect("/admin");
  });
});

router.get("/admin-login", async (req, res) => {
  res.render("admin/login", { admin: true });
});

router.get("/", async function (req, res, next) {
  if (req.session.adminLoggin) {
    department = {
      computer: "Computer Engineering",
      electronics: "Electronics Engineering",
      printing: "Printing Technology",
    };
    res.render("admin/admin-home", {
      admin: true,
      departments: department,
    });
  } else {
    res.redirect("/admin/admin-login");
  }
});

router.post("/admin-login", async (req, res) => {
  const admindata = req.body;

  await adminHelper.checkAdmin(admindata, (result) => {
    if (result) {
      req.session.adminLoggin = true;
      req.session.admin = admindata;

      res.render("admin/admin-home", { admin: true });
    } else {
      console.log("false");
      res.redirect("/admin");
    }
  });
});

module.exports = router;
