<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Priority;
use App\Models\Status;
use App\Models\StatusType;
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
                'status_type_id' => StatusType::where('name', 'not started')->first()->id,
                'color' => 'gray',
                'position' => 0
            ],
            [
                'name' => 'in progress',
                'status_type_id' => StatusType::where('name', 'active')->first()->id,
                'color' => 'orange',
                'position' => 1
            ],
            [
                'name' => 'Closed',
                'status_type_id' => StatusType::where('name', 'closed')->first()->id,
                'color' => 'green',
                'position' => 2
            ]
        ];

        foreach ($defaultStatuses as $defaultStatus) {
            Status::create([
                'name' => $defaultStatus['name'],
                'status_type_id' => $defaultStatus['status_type_id'],
                'user_id' => $user->id,
                'color' => $defaultStatus['color'],
                'position' => $defaultStatus['position']
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
