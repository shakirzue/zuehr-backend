"use strict";

var EmployeeRepo = require("../../Repository/EmployeeProfiling/EmployeeRepo");

var AttendanceRepo = require("../../Repository/TimeManagement/AttendanceRepo");

var UserProfileRepo = require("../../Repository/UserProfiling/UserProfileRepo");

var _require = require('../../DataTransferObjects/loginDto'),
    getLoginDetailByIdResponseDTO = _require.getLoginDetailByIdResponseDTO,
    getLoginDetailResponseDTO = _require.getLoginDetailResponseDTO;

exports.getSingleUserProfile = function _callee(req, res) {
  var response, dtoobject;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(UserProfileRepo.getSingleUserProfile(req, res));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(getLoginDetailByIdResponseDTO(response.data));

        case 5:
          dtoobject = _context.sent;
          return _context.abrupt("return", dtoobject);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getUserProfile = function _callee2(req, res) {
  var response, dtoobject;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(UserProfileRepo.getUserProfile(req, res));

        case 2:
          response = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(getLoginDetailByIdResponseDTO(response.data));

        case 5:
          dtoobject = _context2.sent;
          return _context2.abrupt("return", dtoobject);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.deleteUserProfile = function _callee3(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(UserProfileRepo.deleteUserProfile(req, res));

        case 2:
          response = _context3.sent;
          return _context3.abrupt("return", response);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.registerNonCpcgrUserProfile = function _callee4(req, res) {
  var response, dtoobject;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(UserProfileRepo.registerNonCpcgrUserProfile(req, res));

        case 2:
          response = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(getLoginDetailByIdResponseDTO(response.data));

        case 5:
          dtoobject = _context4.sent;
          return _context4.abrupt("return", response);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.registerUserProfile = function _callee5(req, res) {
  var response, dtoobject;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(UserProfileRepo.registerUserProfile(req, res));

        case 2:
          response = _context5.sent;

          if (!response.data) {
            _context5.next = 10;
            break;
          }

          _context5.next = 6;
          return regeneratorRuntime.awrap(getLoginDetailByIdResponseDTO(response.data));

        case 6:
          dtoobject = _context5.sent;
          return _context5.abrupt("return", response);

        case 10:
          return _context5.abrupt("return", response);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.loginNonCpcgrUserProfile = function _callee6(req, res) {
  var response, dtoobject;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(UserProfileRepo.loginNonCpcgrUserProfile(req, res));

        case 2:
          response = _context6.sent;

          if (!response.data) {
            _context6.next = 10;
            break;
          }

          _context6.next = 6;
          return regeneratorRuntime.awrap(getLoginDetailByIdResponseDTO(response.data));

        case 6:
          dtoobject = _context6.sent;
          return _context6.abrupt("return", dtoobject);

        case 10:
          return _context6.abrupt("return", response);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.forgotPasswordRequest = function _callee7(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(UserProfileRepo.forgotPasswordRequest(req, res));

        case 2:
          response = _context7.sent;
          return _context7.abrupt("return", response);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.resetPasswordRequest = function _callee8(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(UserProfileRepo.resetPasswordRequest(req, res));

        case 2:
          response = _context8.sent;
          return _context8.abrupt("return", response);

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.changePasswordRequest = function _callee9(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(UserProfileRepo.changePasswordRequest(req, res));

        case 2:
          response = _context9.sent;
          return _context9.abrupt("return", response);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
};

exports.passwordResetVerify = function _callee10(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(UserProfileRepo.passwordResetVerify(req, res));

        case 2:
          response = _context10.sent;
          return _context10.abrupt("return", response);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
};