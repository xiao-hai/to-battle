// // pages/signup/signup.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
  
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   }
// })

const AV = require('../../utils/av-weapp-min');
const Todo = require('../../model/signup');

Page({
  data: {
    form: {
      name: ''
    },
    todos: [],
    editedTodo: {},
    draft: '',
    editDraft: null,
  },
  loginAndFetchTodos: function () {
    return AV.Promise.resolve(AV.User.current()).then(user =>
      user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null
    ).then(user =>
      user ? user : AV.User.loginWithWeapp()
      ).then((user) => {
        console.log('uid', user.id);
        return new AV.Query(Todo)
          .equalTo('user', AV.Object.createWithoutData('User', user.id))
          .descending('createdAt')
          .find()
          .then(this.setTodos)
      }).catch(error => console.error(error.message));
  },
  onReady: function () {
    console.log('page ready');
    this.loginAndFetchTodos();
  },
  onPullDownRefresh: function () {
    this.loginAndFetchTodos().then(wx.stopPullDownRefresh);
  },
  setTodos: function (todos) {
    const activeTodos = todos.filter(todo => !todo.done);
    this.setData({
      todos,
      activeTodos,
    });
  },
  updateName: function ({
    detail: {
      value
    }
  }) {
    console.log(value);
    // Android 真机上会诡异地触发多次时 value 为空的事件
    if (!value) return;
    this.setData({
      form: {
        name: value
      }
    });
  },
  addTodo: function () {
    var value = this.data.draft && this.data.draft.trim()
    if (!value) {
      return;
    }
    var acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(AV.User.current(), true);
    acl.setWriteAccess(AV.User.current(), true);
    new Todo({
      content: value,
      done: false,
      user: AV.User.current()
    }).setACL(acl).save().then((todo) => {
      this.setTodos([todo, ...this.data.todos]);
    }).catch(console.error);
    this.setData({
      draft: ''
    });
  },
  toggleDone: function ({
    target: {
      dataset: {
        id
      }
    }
  }) {
    const { todos } = this.data;
    const currentTodo = todos.filter(todo => todo.id === id)[0];
    currentTodo.done = !currentTodo.done;
    currentTodo.save()
      .then(() => this.setTodos(todos))
      .catch(console.error);
  },
  editTodo: function ({
    target: {
      dataset: {
        id
      }
    }
  }) {
    this.setData({
      editDraft: null,
      editedTodo: this.data.todos.filter(todo => todo.id === id)[0] || {}
    });
  },
  updateEditedContent: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      editDraft: value
    });
  },
  doneEdit: function ({
    target: {
      dataset: {
        id
      }
    }
  }) {
    const { todos, editDraft } = this.data;
    this.setData({
      editedTodo: {},
    });
    if (editDraft === null) return;
    const currentTodo = todos.filter(todo => todo.id === id)[0];
    if (editDraft === currentTodo.content) return;
    currentTodo.content = editDraft;
    currentTodo.save().then(() => {
      this.setTodos(todos);
    }).catch(console.error);
  },
  removeDone: function () {
    AV.Object.destroyAll(this.data.todos.filter(todo => todo.done)).then(() => {
      this.setTodos(this.data.activeTodos);
    }).catch(console.error);
  },
});