var xml = require("xml");
var train = require("./api.js");

function getXMLResponse(response) {
  return xml(response);
}

module.exports = {
  getXMLBody: function createResponse(req) {
    var event = req.query.event;
    var data = req.query.data || "";
    var data_ar = [];
    var cid = req.query.cid;
    var res;
    if (event) {
      if (event == "NewCall") {
        res = {
          response: [
            {
              playtext: "Welcome to Galaxy Card"
            },
            {
              collectdtmf: [
                {
                  _attr: { t: "" }
                },
                {
                  playtext: "Press 1 if male  or Press 2 if female"
                }
              ]
            }
          ]
        };
      } else if (event == "GotDTMF") {
        var m_or_f = req.query.sid.split("$")[1];
        data_ar.push(data);
        if (m_or_f || data) {
          console.log("SID:: ", req.query.sid);
          console.log("haha", data_ar);
          if (data_ar[0]) {
            if (data_ar[0] == 1) {
              res = {
                response: [
                  {
                    _attr: { sid: cid + "$" + m_or_f }
                  },
                  {
                    collectdtmf: [
                      {
                        _attr: { t: "" }
                      },
                      {
                        playtext: "Press 1 if you are above 21 or else press 2 "
                      }
                    ]
                  }
                ]
              };
            } else if (data_ar[0] == 2) {
              res = {
                response: [
                  {
                    _attr: { sid: cid + "$" + m_or_f }
                  },
                  {
                    collectdtmf: [
                      {
                        _attr: { t: "" }
                      },
                      {
                        playtext: "Press 1 if you are above 18 or else press 2 "
                      }
                    ]
                  }
                ]
              };
            } else if (data_ar[0].length == 1) {
              res = {
                response: [
                  {
                    _attr: { sid: cid + "$" + m_or_f }
                  },
                  {
                    collectdtmf: [
                      {
                        playtext: "Enter the Correct digit"
                      },
                      {
                        _attr: { t: "" }
                      },
                      {
                        playtext: "Press 1 if male  or Press 2 if female"
                      }
                    ]
                  }
                ]
              };
            }
          } else if (data[1] == 1) {
            res = {
              response: [
                {
                  collectdtmf: [
                    {
                      playtext: "You are an adult"
                    }
                  ]
                }
              ]
            };
          } else if (data[1] == 2) {
            res = {
              response: [
                {
                  collectdtmf: [
                    {
                      playtext: "Minors are not allowed"
                    }
                  ]
                }
              ]
            };
          } else {
            res = {
              response: [
                {
                  collectdtmf: [
                    {
                      playtext: "Wrong Input"
                    }
                  ]
                }
              ]
            };
          }
        } else {
          res = {
            response: [
              {
                playtext: "You have not entered anything"
              },
              {
                collectdtmf: [
                  {
                    _attr: { t: "" }
                  },
                  {
                    playtext: "Please enter 1 if male and 2 if female."
                  }
                ]
              }
            ]
          };
        }
      }
    } else {
      res = {
        response: [
          {
            hangup: "Thanks for calling"
          }
        ]
      };
    }
    return getXMLResponse(res);
  }
};
