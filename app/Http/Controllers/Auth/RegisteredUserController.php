<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Priority;
use App\Models\Status;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $defaultStatuses = [
            [
                'name' => 'Open',
                'type' => 'not started',
                'color' => 'gray'
            ],
            [
                'name' => 'Closed',
                'type' => 'closed',
                'color' => 'green'
            ]
        ];

        foreach ($defaultStatuses as $defaultStatus) {
            Status::create([
                'name' => $defaultStatus['name'],
                'type' => $defaultStatus['type'],
                'user_id' => $user->id,
                'color' => $defaultStatus['color']
            ]);
        }

        $defaultPriorities = [
            [
                'name' => 'urgent',
                'value' => 3,
                'color' => 'red',
            ],
            [
                'name' => 'high',
                'value' => 2,
                'color' => 'yellow',
            ],
            [
                'name' => 'normal',
                'value' => 1,
                'color' => 'blue',
            ],
            [
                'name' => 'low',
                'value' => 0,
                'color' => 'green',
            ],
        ];

        foreach ($defaultPriorities as $defaultPriority) {
            Priority::create([
                'name' => $defaultPriority['name'],
                'value' => $defaultPriority['value'],
                'color' => $defaultPriority['color'],
                'user_id' => $user->id,
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
