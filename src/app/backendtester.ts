import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { mergeMap, materialize, delay, dematerialize } from "rxjs/operators";

let users = JSON.parse(localStorage.getItem("users")) || [];

// starter backend tester that we never used
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
    function handleRoute() {
      switch (true) {
        case url.endsWith("/login") && method === "POST":
          return authenticate();
        case url.endsWith("/signup") && method === "POST":
          return register();
        default:
          return next.handle(request);
      }
    }
    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) return error("Username or password is incorrect");
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: "fake-jwt-token",
      });
    }
    function register() {
      const user = body;
      if (users.find((x) => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }
      user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      return ok();
    }
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }
    function error(message) {
        return throwError({ error: { message } });
    }
  }
}
export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
