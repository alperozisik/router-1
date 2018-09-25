const Renderer = require("./Renderer");
const Application = require("sf-core/application");

/**
 * Renderer for Android
 * It encapsulates all logic to display pages on Android
 */
class AndroidRenderer extends Renderer {
  /**
   * @constructor
   * @params {Page|NavigationController} root
   */
  constructor(rootController) {
    super(rootController);
    Renderer.setasRoot(rootController);
  }

  /**
   * Only use if rootpage is NavigationController
   * @params {Array.<object>} controllers
   */
  addChildViewControllers(controllers) {
    this._rootController.childControllers = controllers;
  }

  /**
   * Pushes a new page to rootpage which is instance of NavigationController
   * Only use if rootpage is NavigationController
   * @params {Array.<object>} controllers
   */
  pushChild(page, animated = true) {
    super.pushChild();
    this._rootController.push && this._rootController.push({controller: page, animated: animated});
  }

  /**
   * NavigationController child page is changed handler
   * Only use if rootpage is NavigationController
   *
   * @params {function} fn
   */
  onNavigatorChange(fn) {
    if (this._rootController.onTransition) {
      this._rootController.onTransition = fn;
      return () => (this._rootController.onTransition = () => null);
    }

    return () => null;
  }

  /**
   * Only use if rootpage is NavigationController
   *
   * @params {boolean} [=true] animated
   */
  popChild(animated = true) {
    super.popChild();
    this._rootController.pop && this._rootController.pop({ animated: animated });
  }

  /**
   *
   * Only use if rootpage is Page
   * @params {NavigationController} controller
   */
  show(page) {
    super.show();
    Application.setRootController(page);
  }
}

module.exports = AndroidRenderer;