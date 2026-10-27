import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { GsInput } from '../../../../shared/ui/gs-input/gs-input';

@Component({
    selector: 'login-page',
    imports: [ReactiveFormsModule, GsInput],
    templateUrl: './login-page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
    readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly formBuilder = inject(FormBuilder);

    readonly form = this.formBuilder.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });

    private readonly returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/backlog';

    async submit(): Promise<void> {
        if (this.form.invalid) {
            return;
        }
        const { email, password } = this.form.getRawValue();
        const response = await this.authService.signInWithPassword({ email, password });
        if (!response.error) {
            await this.router.navigateByUrl(this.returnUrl);
        }
    }
}