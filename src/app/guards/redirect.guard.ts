import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenService } from "@services/token.service";

// si ya tiene una sesión abierta redirige a la app
export const RedirectGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.getToken();
  if (token) {
    router.navigate(['/app']);
    return false;
  }
  return true;
};
