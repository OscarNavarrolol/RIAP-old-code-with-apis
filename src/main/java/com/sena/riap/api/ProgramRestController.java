package com.sena.riap.api;

import com.sena.riap.entities.Program;
import com.sena.riap.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@RequestMapping("/api_program")
public class ProgramRestController {

    @Autowired
    private ProgramService programService;

    @GetMapping("/list_program")
    public List<Program> listProgram() {
        return programService.getProgram();
    }

    @GetMapping("/find/{id_program}")
    public Program getProgram(@PathVariable("id_program") Long idProgram) {
        return programService.getProgramById(idProgram);
    }

    @PostMapping("/save")
    public Program saveProgram(@RequestBody Program program) {
        return programService.saveProgram(program);
    }

    @PutMapping("/update/{id_program}")
    public Program updateProgram(@PathVariable("id_program") Long idProgram, @RequestBody Program program) {
        return programService.updateProgram(idProgram, program);
    }

    @DeleteMapping("/delete/{id_program}")
    public void deleteProgram(@PathVariable("id_program") Long idProgram) {
        programService.deleteProgram(idProgram);
    }

}
