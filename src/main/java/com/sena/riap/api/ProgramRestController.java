package com.sena.riap.api;


import com.sena.riap.entities.Program;
import com.sena.riap.entities.UserCourse;
import com.sena.riap.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProgramRestController {

    @Autowired
    private ProgramService programService;

    @GetMapping("/program")
    public List<Program> listProgram() {
        return programService.getProgram();
    }

    @GetMapping("/program/{id_program}")
    public Program getProgram(@PathVariable("id_program") Long idProgram) {
        return programService.getProgramById(idProgram);
    }

    @PostMapping("/program")
    public Program saveProgram(@RequestBody Program program) {
        return programService.saveProgram(program);
    }

    @PutMapping("/program/{id_program}")
    public Program updateProgram(@PathVariable("id_program") Long idProgram, @RequestBody Program program) {
        return programService.updateProgram(idProgram, program);
    }

    @DeleteMapping("/program/{id_program}")
    public void deleteProgram(@PathVariable("id_program") Long idProgram) {
        programService.deleteProgram(idProgram);
    }
}
