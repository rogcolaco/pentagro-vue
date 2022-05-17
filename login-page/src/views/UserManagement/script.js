import $http from "../../plugins/axios";

export default {
  name: "UserManagementView",
  data() {
    return {
      users: "",
      localPassword: "",
      confirmLocalPassword: "",
      products: "",
      userSkils: [],
      inputStatus: {
        userName: true,
        name: true,
        password: true,
        email: true,
        unitId: true,
      },
      user: {
        disabled: false,
        email: "",
        id: 0,
        improveTeamMember: false,
        loginExpiration: 5,
        name: "",
        receiveAutonomousWarning: false,
        supervisor: false,
        system: "G",
        unitId: 0,
        userName: "",
        userPassword: "",
      },
    };
  },
  created() {
    if (!$http.defaults.headers.common["Authorization"]) {
      this.$router.push("/access-denied");
    }
    $http.get("getusers").then((res) => {
      this.users = res.data;
    });
    $http
      .get("getproductionunitlist")
      .then((res) => (this.products = res.data.productionUnitList));
    this.checkSuperSkils();
  },
  methods: {
    async saveUser() {
      this.checkPassword();
      this.checkEmail();
      this.inputStatus.unitId = this.checkboxValidation();
      if (
        this.inputStatus.password &&
        this.inputStatus.email &&
        this.inputStatus.unitId &&
        this.user.name &&
        this.user.userName
      ) {
        this.user.userPassword = this.passwordEncripty(this.localPassword);
        this.user.userPassword = this.changeBase(this.user.userPassword);
        this.setUserSkills();
        console.log(this.user);
        await $http.post("saveuser", this.user).catch((error) => {
          console.log(error.response.status);
          this.loginDenied = true;
        });
        $http.get("getusers").then((res) => {
          this.users = res.data;
        });
        this.cleanForm();
      } else {
        !this.user.userName
          ? (this.inputStatus.userName = false)
          : (this.inputStatus.userName = true);
        !this.user.name
          ? (this.inputStatus.name = false)
          : (this.inputStatus.name = true);
        console.log("não passou!");
      }
      // $http.get("getusers").then((res) => {
      //   this.users = res.data;
      // });
      // this.cleanForm()
    },
    async updateUserbyId(id) {
      this.cleanForm();
      await $http.get("getuserbyid/G/" + id).then((res) => {
        console.log(res.data);
        this.user.id = res.data.id;
        this.user.email = res.data.email;
        this.user.disabled = res.data.disabled;
        this.user.improveTeamMember = res.data.improveTeamMember;
        if (this.user.improveTeamMember)
          this.userSkils.push("improveTeamMember");
        this.user.loginExpiration = res.data.loginExpiration;
        this.user.name = res.data.name;
        this.user.receiveAutonomousWarning = res.data.receiveAutonomousWarning;
        if (this.user.receiveAutonomousWarning)
          this.userSkils.push("receiveAutonomousWarning");
        this.user.supervisor = res.data.supervisor;
        if (this.user.supervisor) this.userSkils.push("supervisor");
        this.user.system = res.data.system;
        this.user.unitId = res.data.unitId;
        this.user.userName = res.data.userName;
        this.localPassword = res.data.userPassword;
        this.confirmLocalPassword = res.data.userPassword;
      });
      this.checkSuperSkils();
    },
    cleanForm() {
      this.resetFormFields();
      this.resetInputStatus();
      this.checkSuperSkils();
    },
    subtractTime() {
      this.user.loginExpiration > 0
        ? this.user.loginExpiration--
        : (this.user.loginExpiration = 0);
    },
    sumTime() {
      this.user.loginExpiration++;
    },
    checkSuperSkils() {
      this.userSkils = [];
      if (this.user.receiveAutonomousWarning)
        this.userSkils.push("receiveAutonomousWarning");
      if (this.user.supervisor) this.userSkils.push("supervisor");
      if (this.user.disabled) this.userSkils.push("disabled");
    },
    checkPassword() {
      if (
        this.localPassword.trim() &&
        this.confirmLocalPassword.trim() !== "" &&
        this.localPassword.trim() === this.confirmLocalPassword.trim()
      ) {
        this.inputStatus.password = true;
      } else {
        this.inputStatus.password = false;
      }
    },
    checkEmail() {
      let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      if (regex.test(this.user.email)) {
        this.inputStatus.email = true;
      } else {
        this.inputStatus.email = false;
      }
    },
    checkboxValidation() {
      if (this.user.unitId == 0) {
        return false;
      } else {
        return true;
      }
    },
    passwordEncripty(localPassword) {
      var md5 = require("md5");
      return md5(localPassword);
    },
    changeBase(localData) {
      if (localData.trim() !== "") {
        return btoa(localData);
      }
    },
    setUserSkills() {
      this.user.supervisor = false;
      this.user.receiveAutonomousWarning = false;
      this.user.disabled = false;
      this.userSkils.forEach((item) => {
        if (item === "supervisor") {
          this.user.supervisor = true;
          this.user.improveTeamMember = true;
        }
        if (item === "receiveAutonomousWarning")
          this.user.receiveAutonomousWarning = true;
        if (item === "disabled") this.user.disabled = true;
      });
    },
    resetFormFields() {
      this.user.id = 0;
      this.user.email = "";
      (this.user.userName = ""), (this.user.disabled = false);
      this.user.improveTeamMember = false;
      this.user.loginExpiration = 5;
      this.user.name = "";
      this.user.receiveAutonomousWarning = false;
      this.user.supervisor = false;
      this.user.system = "";
      this.user.unitId = "";
      this.localName = "";
      this.localPassword = "";
      this.confirmLocalPassword = "";
    },
    resetInputStatus() {
      this.inputStatus.userName = true;
      this.inputStatus.password = true;
      this.inputStatus.name = true;
      this.inputStatus.email = true;
      this.inputStatus.unitId = true;
    },
  },
};