import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // On récupère le token actuellement rangé dans le navigateur.
  const token = inject(AuthService).getToken();

  // Léa n'est pas connectée (pas de token) : on laisse la requête
  // partir telle quelle, sans rien y ajouter.
  if (!token) {
    return next(req);
  }

  // Léa est connectée : on CLONE la requête (une requête HTTP est
  // immuable, impossible de la modifier directement) en y ajoutant
  // l'en-tête Authorization — exactement ce que faisait le bouton
  // "Authorize" dans Swagger, mais ici c'est fait automatiquement,
  // à chaque requête, sans intervention.
  return next(
    req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  );
};