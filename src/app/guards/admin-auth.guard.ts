import { inject } from '@angular/core';
import { Router } from "@angular/router";

export const blockPage = () => {
    const router = inject(Router);

    // Verificar si localStorage está disponible
    let role = null;
    if (typeof localStorage !== 'undefined') {
        role = localStorage.getItem('role');
    }

    if (role && role === '6639dbc70fc2fd0ef9038cdd') {
        return true;
    } else {
        router.navigate(['/']);
        return false;
    }
}
