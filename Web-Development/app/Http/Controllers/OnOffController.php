<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Control;

class OnOffController extends Controller
{

    //POST
    public function sendCommand(Request $request)
    {
        $request->validate([
            'command' => 'required|in:ON,OFF',
        ]);

        Control::updateOrCreate(
            ['name' => 'latest_ac_command'],
            ['value' => $request->command]
        );

        return back()->with('status', 'Command sent successfully!');
    }


    //GET
    public function getLatestCommand()
    {
        $command = Control::where('name', 'latest_ac_command')->first();

        if ($command) {
            $commandValue = $command->value;
            $command->delete();
            return response()->json(['command' => $commandValue]);
        }

        return response()->json(['command' => 'none']);
    }




    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
