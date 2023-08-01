import { BlockClass } from "./Block";
import { Route } from "./Route";
import { PATHNAMES } from "./paths";

class Router {
  static __instance: Router;
  private routers: Array<Route> = [];
  private history: History = window.history;
  private currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use<Props>(pathname: string, block: BlockClass<Props>, props: any = {}) {
    const route = new Route(pathname, block, props);
    this.routers.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return this.go(PATHNAMES.PATH_NOT_FOUND);
    }
    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }
    this.currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    const router = this.routers.find((route) => route.match(pathname));
    if (router && router["block"] !== null) {
      router["block"] = null;
    }
    return router || this.routers.find((route) => route.match("*"));
  }

  getRouters() {
    return this.routers;
  }
}

export default new Router();
